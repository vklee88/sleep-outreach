import React, { Component } from "react";
import { Paragraph, Image, Small } from 'evergreen-ui';
import pvtImage from './pvt_sleepiness.png';
import subjectiveImage from './subjective_sleepiness.gif';

class Discussion extends Component {
  render() {
    return (
      <div align="left" style={{paddingRight: 20}}>
        <br/>
        <Paragraph>We're actually aren't very accurate at judging how little sleep we get. In the diagrams below from research papers,
          the PVT accurately separates out how tired you are based on how little sleep you get. However, the mean sleepiness score,
          which was measured subjectively (by asking the participants), isn't totally accurate as there is an overlap between 9 hrs/night and 7 hrs/night.
        </Paragraph>
        <br/>
        <Image src={pvtImage} width="45%" maxWidth={338} />
        <Image src={subjectiveImage} width="55%" maxWidth={412} />
        <Paragraph size={300}>Image on the left: PVT lapses (reaction time >500 ms) with 8hrs/night of sleep (diamond),
          6 hrs (white square), 4 hrs (circle), no sleep (black square); Image on the right: how tired people report they are
          (higher is more tired) vs hrs of sleep per night</Paragraph>
        <br/>
        <br/>
        <Paragraph>
          One thing that this test indirectly measures is microsleeps (that is, falling asleep for a very short time,
          without you realizing it). This is one of the reasons sleep scientists use the PVT test instead of asking
          for subjective sleepiness.</Paragraph>
        <br/>
        <Paragraph>If you're sleep deprived but don't know it, it's best to increase the time you sleep or improve your
          sleep quality. For some resources on how to get more/better sleep,
          you can click <a href='https://www.nhlbi.nih.gov/health-topics/sleep-deprivation-and-deficiency'>here</a>.</Paragraph>
        <br/>
        <Paragraph size={300}>Image sources: (left) Dorrian, Rogers, Dinges (2005), Psychomotor Vigilance Performance: Neurocognitive Assay Sensitive to Sleep Loss; (right) Belenky et al. (2003), Patterns of performance degradation and restoration during sleep restriction and subsequent recovery: a sleep dose‐response study
        </Paragraph>
      </div>
    )
  }
}

export default Discussion;
