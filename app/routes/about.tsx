import React from "react";

const bioParts = [
  `I have loved art, drawing and creating from an early age. I find as the years have gone by I like to push to better myself and am learning everyday. Exploring new techniques and mediums.
Working using acrylics, watercolour and pencil gives me a range of subjects to draw and also allows me to be creative.`,

  `I find it relaxing and calming to lose myself in the subject I am working on. I love nature, birds, animals and landscapes. These being the focus and inspiration of my latest works. I love seeing the drawings and paintings come alive giving them a personality of their own.`,

  `I love being challenged and will always strive and push myself to keep creating and mastering.`,
];

const picture = {
  width: 1125,
  height: 1765,
};

const About: React.FC = () => (
  <div>
    <h5>About me</h5>
    <div>
      <div>
        {bioParts.map((part, i) => (
          <p key={i}>{part}</p>
        ))}
        <a href={`mailto:barlow.collette@gmail.com`}>
          barlow.collette@gmail.com
        </a>
      </div>
      <div>
        <img
          width={picture.width * 0.8}
          height={picture.height * 0.8}
          src={`https://res.cloudinary.com/dqvlfpaev/image/upload/v1624578929/197472447_320757756265540_8200265514722458335_n_wjnutc.jpg`}
        />
      </div>
    </div>
  </div>
);
export default About;
