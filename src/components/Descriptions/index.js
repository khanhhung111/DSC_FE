const Descriptions = ({ title, content }) => (
  <div className="flex items-center">
    <div className="font-medium w-1/3">{title}</div>
    <div className="text-gray-700 w-2/3">{content}</div>
  </div>
);

export default Descriptions;
