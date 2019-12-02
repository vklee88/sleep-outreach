import React, { Component } from 'react';
import { Button, Paragraph, ListItem, UnorderedList } from 'evergreen-ui';

class PVT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSampleTime: 0,
      lastFalseStart: false,
      isHidden: true,
      statsShown: false,
      timeSelected: false,
      resultText: ''
    };
    this.meanReactionTime = 0;
    this.sampleCount = 0;
    this.lapses = 0;
    this.falseStarts = 0;
    this.reactionTimes = [];

    this.pvtType = '';
    this.timeEnd = 0;
    this.reactionTime = 0;
    this.randomRange = 0;
    this.randomShift = 0;

    this.flashBtn = this.flashBtn.bind(this);
    this.hideFeedback = this.hideFeedback.bind(this);
  }

  end() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.timeEnd = 0;
    this.reportStats();
    this.setState({
      lastSampleTime: 0,
      lastFalseStart: false,
      isHidden: true
    });
  }

  endEarly(e) {
    e.preventDefault();
    this.end();
  }

  flashBtn() {
    this.setState({
      isHidden: false
    });
    this.reactionTime = new Date().getTime();
  }

  hideFeedback() {
    this.setState({
      lastFalseStart: false,
      lastSampleTime: 0
    })
  }

  onKeyPressed(e) {
    let currTime = new Date().getTime();
    if (e.key === 'f' && this.timeEnd !== 0) {
      // TODO implement PVT
      if (this.feedbackTimeout) {
        clearTimeout(this.feedbackTimeout);
        this.feedbackTimeout = null;
      }
      if (this.state.isHidden) {
        // false start
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.falseStarts++;
        this.setState({
          lastFalseStart: true,
          isHidden: true,
          lastSampleTime: 0
        })
      } else {
        this.reactionTime = currTime - this.reactionTime;
        this.sampleCount++;
        this.meanReactionTime = this.meanReactionTime * (this.sampleCount - 1) / (this.sampleCount) + this.reactionTime / this.sampleCount;
        if (this.reactionTime > 500) {
          this.lapses++;
          this.reactionTimes.push(this.reactionTime);
        } else if (this.reactionTime < 100) {
          this.falseStarts++;
        } else {
          this.reactionTimes.push(this.reactionTime);
        }
        this.setState({
          isHidden: true,
          lastSampleTime: this.reactionTime,
          lastFalseStart: false
        });
      }
      this.feedbackTimeout = setTimeout(this.hideFeedback, 1000);
      if (currTime > this.timeEnd) {
        this.end();
      } else {
        this.timeout = setTimeout(this.flashBtn, (Math.random() * this.randomRange + this.randomShift) * 1000);
      }
    }
  }

  reportStats() {
    let resultText = '';
    let multiplier;
    if (this.pvtType === '5 min') {
      multiplier = 1;
      // >= 2, >= 4, >= 6
    } else {
      // >= 4 warning, >= 8 = 1 day deprivation, >= 12 = 2 days deprivation
      multiplier = 2;
    }
    if (this.lapses < 2 * multiplier) {
      resultText = <Paragraph>Keep up the good work on getting enough sleep! Encourage others to get enough sleep as well.
        For some resources on how to get more/better sleep,
        you can check <a href='https://www.nhlbi.nih.gov/health-topics/sleep-deprivation-and-deficiency'>here</a>.</Paragraph>;
    } else if (this.lapses < 4 * multiplier) {
      resultText = <Paragraph>Try to get a little more sleep. While you haven't reached the point where . For some resources on how to get more/better sleep,
        you can click <a href='https://www.nhlbi.nih.gov/health-topics/sleep-deprivation-and-deficiency'>here</a>.</Paragraph>;
    } else if (this.lapses < 6 * multiplier) {
      resultText = <Paragraph>Looks like you'll need to get some more or better quality sleep. Your results are similar
        to people who have been totally sleep deprived for 1 day (and the effects of being partially sleep deprived for multiple nights
        can accumulate to this point). For some resources on how to get more/better sleep,
        you can click <a href='https://www.nhlbi.nih.gov/health-topics/sleep-deprivation-and-deficiency'>here</a>.</Paragraph>;
    } else {
      resultText = <Paragraph>Please make sure to get more or better quality sleep. At this point, your results mirror people who have
        been totally sleep deprived for 2 days or more in research studies. For some resources on how to get more/better sleep,
        you can click <a href='https://www.nhlbi.nih.gov/health-topics/sleep-deprivation-and-deficiency'>here</a>.</Paragraph>;
    }
    this.setState({
      statsShown: true,
      resultText: resultText
    })
  }

  resetStats() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.meanReactionTime = 0;
    this.falseStarts = 0;
    this.lapses = 0;
    this.sampleCount = 0;
    this.reactionTimes = [];
    this.setState({
      isHidden: true,
      statsShown: false
    });
  }

  startFiveMinPVT(e) {
    e.preventDefault();
    this.resetStats();
    this.pvtType = '5 min';
    this.timeEnd = new Date().getTime() + 5 * 60 * 1000;
    this.randomRange = 8;
    this.randomShift = 2;
    this.setState({
      timeSelected: true
    });
    this.timeout = setTimeout(this.flashBtn, 2000);
  }

  startTenMinPVT(e) {
    e.preventDefault();
    this.resetStats();
    this.pvtType = '10 min';
    this.timeEnd = new Date().getTime() + 10 * 60 * 1000;
    this.randomRange = 8;
    this.randomShift = 2;
    this.setState({
      timeSelected: true
    });
    this.timeout = setTimeout(this.flashBtn, 2000);
  }

  render() {
    return (
      <div
        onKeyDown={(e) => this.onKeyPressed(e)}
        tabIndex={0}
        align="left" >
        <div>
          <br/>
          <Paragraph>
            The Psychomotor Vigilance Task (or PVT) is a test used to measure how objectively sleep deprived one is.
            The focus of the test is to make sure that you have enough energy to focus on the task, which can be very different from how sleep deprived you think you are.
            These tests take 5-10 minutes (but the 10 minute test is considered to be more accurate).
          </Paragraph>
          <br/>
          <Paragraph>
            <b>Instructions:</b> Press start to start either the 5 minute or 10 minute PVT. For the duration of the test, press the 'f' key as soon as possible when the red rectangle appears.
          </Paragraph>
          <br/>
        </div>
        <div style={{"border": "3px solid black", "height": 300, "width": 400}}>
          <div hidden={this.state.isHidden} style={{"width": 250, "height": 200, "background": "red", "margin": "50px 75px 50px 75px"}} ></div>
          {this.state.lastFalseStart && <Paragraph>False start. Wait for the red rectangle first.</Paragraph>}
          {this.state.lastSampleTime > 0 && <Paragraph>Time: {this.state.lastSampleTime} ms</Paragraph>}
          {this.state.statsShown && <Paragraph>End of test. Please check below for results.</Paragraph>}
        </div>
        <Button onClick={(ev) => this.startFiveMinPVT(ev)}>Start 5 min PVT</Button>
        <Button onClick={(ev) => this.startTenMinPVT(ev)}>Start 10 min PVT</Button>
        {this.state.timeSelected && <Button onClick={(ev) => this.endEarly(ev)}>End PVT</Button>}
        <br/>
        {this.state.statsShown &&
        <div>
          <br/>
          <Paragraph>The main thing that the PVT measures is the number of attentional lapses (defined as having a reaction time >500 ms). You had {this.lapses} lapse(s).</Paragraph>
          {this.state.resultText}
          <br/>
          <Paragraph>Other stats that may be useful:</Paragraph>
          <UnorderedList>
            <ListItem>Average reaction time: {this.meanReactionTime} ms</ListItem>
            <ListItem>Number of false starts (reaction time &lt;100 ms/rectangle doesnt appear): {this.falseStarts}</ListItem>
          </UnorderedList>
        </div>}
        <br/>
        <Paragraph>If you'd like to see a little more about how the PVT works, click on the "What's going on?" tab.</Paragraph>
      </div>
    )
  }
}

export default PVT;
