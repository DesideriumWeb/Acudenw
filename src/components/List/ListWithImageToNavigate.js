import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { PORTAL_ROUTES } from "../../config/config";
import ProviderService from "../../services/userServices/ProviderService";

export default function ListWithImageToNavigate({
  items = [],
  icon = <IoPersonCircle size={60} color="#092C4C" />,
}) {
  const [realImages, setRealImages] = useState(items);
  const [itemsState, setitemsState] = useState({ news: items });

  useEffect(() => {
    const fetchImages = async (items) => {
      const imgArr = [];
      for (const d of items) {
        try {
          const imageResult = await new ProviderService().getLogoImage(
            d.createdByUserId
          );
          if (imageResult) {
            imgArr.push({
              ...d,
              imageBase64: URL.createObjectURL(imageResult),
            });
          } else {
            //On image error, push item & use default icon
            imgArr.push(d);
          }
        } catch (error) {
          //On image error, push item & use default icon
          imgArr.push(d);
        }
      }
      setRealImages(imgArr);
    };

    if (items.length > 0) {
      fetchImages(items);
    }
  }, [items]);

  return (
    <div className={"flex flex-col gap-3 pt-3"}>
      {realImages.map(
        ({ id, title, authorName, imageAlt, imageBase64 }, index) => (
          <React.Fragment key={index}>
            <div
              key={index}
              className={"flex flex-row items-center justify-between"}
            >
              <div className={"flex flex-row gap-2 items-center"}>
                <div>
                  {!imageBase64 ? (
                    icon
                  ) : (
                    <img
                      src={imageBase64}
                      alt={imageAlt}
                      className="h-16 w-216 rounded-md"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <h5 className="text font-semibold hover:underline">
                    <Link
                      className={"text-inherit"}
                      state={itemsState}
                      to={`${PORTAL_ROUTES.NEWS_DETAILS_ROUTE}${btoa(id)}`}
                    >
                      <span className="line-clamp-1">{title}</span>
                    </Link>
                  </h5>
                  <p className="text-gray-500 text-sm my-0 py-0">
                    {authorName}
                  </p>
                </div>
              </div>
            </div>
            {index !== items.length - 1 && (
              <div className="h-[1.5px] w-full bg-gray-200 rounded-full"></div>
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
}
