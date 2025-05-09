import React from 'react';
import AudioConverter from '../../components/tools/AudioConverter';
import SEO from '../../components/SEO';

const Mp4ToMp3 = () => {
  return (
    <>
      <SEO 
        title="MP4 to MP3 Converter"
        description="Convert MP4 videos to MP3 audio format online. Extract audio from video files easily and for free."
        keywords="mp4 to mp3, video to audio, extract audio, mp4 converter, audio extractor"
      />
      
      <AudioConverter
        inputFormat="mp4"
        outputFormat="mp3"
        title="Convert MP4 to MP3"
        description="Extract audio from your MP4 videos and save as MP3. Fast, free, and secure."
      />
    </>
  );
};

export default Mp4ToMp3; 