import './Screen.css';

// Display Component
// Could not make textfit work because it's not compatible with current version of react. using a div with a p tag instead, and setting the font size to appropriate responsive units in css
const Screen = ({ value }) => {
  return (
    <div className="screen">
      <p>{value}</p>
    </div>
  );
};

export default Screen;
