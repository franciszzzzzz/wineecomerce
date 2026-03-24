import Link from "next/link";
import "./category-card.css";
import { FaCircleArrowRight } from "react-icons/fa6";

const CategoryCard = () => {
  return (
    <>
      <div className="categoryCard">
        <div
          className="categoryCard_img"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dmi6jwme4/image/upload/v1762977936/products/vow8oumgkehczlap4bya.jpg)`,
          }}
        ></div>
        <p className="categoryCard_text">Vodkas</p>
        <Link
          href="/categories/68ce84136457d49882ce1f01"
          style={{ textDecoration: "none" }}
        >
          <button className="categoryCard_btn button">
            Shop here
            <FaCircleArrowRight size={15} />
          </button>
        </Link>
      </div>

      <div className="categoryCard">
        <div
          className="categoryCard_img"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dy9aaziy5/image/upload/v1766144799/products/upmfngff7jf54hpgpqhp.jpg)`,
          }}
        ></div>
        <p className="categoryCard_text">Whiskey</p>
        <Link
          href="/categories/68ce83d56457d49882ce1efe"
          style={{ textDecoration: "none" }}
        >
          <button className="categoryCard_btn button">
            Shop here
            <FaCircleArrowRight size={15} />
          </button>
        </Link>
      </div>

      <div className="categoryCard">
        <div
          className="categoryCard_img"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dy9aaziy5/image/upload/v1763014674/products/rpc8ytc0acsittuumnfp.jpg)`,
          }}
        ></div>
        <p className="categoryCard_text">Tequila</p>
        <Link
          href="/categories/68ce840b6457d49882ce1f00" // the link is wrong
          style={{ textDecoration: "none" }}
        >
          <button className="categoryCard_btn button">
            Shop here
            <FaCircleArrowRight size={15} />
          </button>
        </Link>
      </div>

      <div className="categoryCard">
        <div
          className="categoryCard_img"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dy9aaziy5/image/upload/v1763041140/products/d7onxe61rprhtmkuayne.jpg)`,
          }}
        ></div>
        <p className="categoryCard_text">Rum</p>
        <Link
          href="/categories/68ce841d6457d49882ce1f02"
          style={{ textDecoration: "none" }}
        >
          <button className="categoryCard_btn button">
            Shop here
            <FaCircleArrowRight size={15} />
          </button>
        </Link>
      </div>

      <div className="categoryCard">
        <div
          className="categoryCard_img"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dy9aaziy5/image/upload/v1763017356/products/vjtpg6hns8f8fp4ynai3.jpg)`,
          }}
        ></div>
        <p className="categoryCard_text">Gin</p>
        <Link
          href="/categories/68ce84266457d49882ce1f04"
          style={{ textDecoration: "none" }}
        >
          <button className="categoryCard_btn button">
            Shop here
            <FaCircleArrowRight size={15} />
          </button>
        </Link>
      </div>

      <div className="categoryCard">
        <div
          className="categoryCard_img"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dy9aaziy5/image/upload/v1763041630/products/mjgxgivjktxemmelhfpl.jpg)`,
          }}
        ></div>
        <p className="categoryCard_text">Cognac</p>
        <Link
          href="/categories/68ce84426457d49882ce1f05" // the link is wrong
          style={{ textDecoration: "none" }}
        >
          <button className="categoryCard_btn button">
            Shop here
            <FaCircleArrowRight size={15} />
          </button>
        </Link>
      </div>

      <div className="categoryCard">
        <div
          className="categoryCard_img"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dy9aaziy5/image/upload/v1763021814/products/sok1li0zqqcdnncumihv.jpg)`,
          }}
        ></div>
        <p className="categoryCard_text">Champagne</p>
        <Link
          href="/categories/68ce84496457d49882ce1f06" // the link is wrong
          style={{ textDecoration: "none" }}
        >
          <button className="categoryCard_btn button">
            Shop here
            <FaCircleArrowRight size={15} />
          </button>
        </Link>
      </div>
    </>
  );
};

export default CategoryCard;
