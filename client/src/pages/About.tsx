function About() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-mono">About Us</h1>
      <p className="p-10 flex flex-col">
        <span className="font-bold text-[#8B5DFF]">Welcome to Folio</span>
        <span className="font-light 2xl:text-xl max-w-2xl">
          {" "}
          At Folio, we believe your work deserves to be seen. Our platform
          empowers you to create a professional portfolio that showcases your
          unique skills, experiences, and achievements — all with ease. Whether
          you’re a designer, writer, developer, photographer, or entrepreneur,
          we’re here to help you build a stunning portfolio that will set you
          apart from the crowd. No coding skills needed, just creativity and the
          tools to make it shine.
        </span>
      </p>
      <p className="p-10 our-mission-section flex flex-col text-right">
        <span className="font-bold text-[#8B5DFF]">Our Mission</span>
        <span className="font-light 2xl:text-xl max-w-2xl">
          Our mission is simple: to make it easy for professionals from all
          industries to build a portfolio that truly represents their talents.
          We’re here to help you create an online space where you can proudly
          display your best work and attract potential clients, collaborators,
          and employers. We believe a well-crafted portfolio can open doors, and
          we want to help you take that first step toward success.
        </span>
      </p>
    </div>
  );
}

export default About;
