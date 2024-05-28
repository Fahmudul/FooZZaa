const Subtitle = ({ heading, subheading }) => {
  return (
    <div className="text-center w-[80%] mx-auto my-5">
      <p className="mb-4 text-lg text-yellow-500">--- {subheading} ---</p>
      <h1 className="border-y-2 py-4 text-4xl uppercase">{heading}</h1>
    </div>
  );
};

export default Subtitle;
