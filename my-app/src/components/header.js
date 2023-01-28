import images from "../img/images.jpg";

export const Header = ({}) => {
  return (
    <div className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">
          <img className="img_logo" src={images} />
        </a>
      </div>
    </div>
  );
};
