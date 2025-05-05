const Hero = ({ title, subtitle, ctaText, ctaLink }) => {
    return (
      <div className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg mt-4">{subtitle}</p>
        <a
          href={ctaLink}
          className="mt-6 inline-block bg-secondary text-white py-2 px-4 rounded hover:bg-opacity-90"
        >
          {ctaText}
        </a>
      </div>
    );
  };
  
  export default Hero;