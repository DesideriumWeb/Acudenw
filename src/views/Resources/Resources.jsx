import React, {useState} from "react";
import { FaPlay } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import useEmployeeProfile from "../../hooks/Employees/useEmployeeProfile";
import ResourceBanner from "./ResourceBanner";
import ResourcesVideos from "./ResourcesVideos";
import Paginator from "../../components/Paginator";

const videos = [
  {
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
    title: "Titulo del Video",
    desc: "Enim consequat ut qui voluptate.Enim eiusmod nulla dolore ullamco proident non dolore nostrud laborum commodo sunt quis commodo esse.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587235587178-e4a6dbe63726?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHRvZGRsZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60",
    title: "Titulo del Video",
    desc: "Enim consequat ut qui voluptate.Enim eiusmod nulla dolore ullamco proident non dolore nostrud laborum commodo sunt quis commodo esse.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1592781959774-4f2498f581d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
    title: "Titulo del Video",
    desc: "Enim consequat ut qui voluptate.Enim eiusmod nulla dolore ullamco proident non dolore nostrud laborum commodo sunt quis commodo esse.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
    title: "Titulo del Video",
    desc: "Enim consequat ut qui voluptate.Enim eiusmod nulla dolore ullamco proident non dolore nostrud laborum commodo sunt quis commodo esse.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGZhbWlseXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60",
    title: "Titulo del Video",
    desc: "Enim consequat ut qui voluptate.Enim eiusmod nulla dolore ullamco proident non dolore nostrud laborum commodo sunt quis commodo esse.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1622610607501-32ac9c927216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGZhbWlseXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60",
    title: "Titulo del Video",
    desc: "Enim consequat ut qui voluptate.Enim eiusmod nulla dolore ullamco proident non dolore nostrud laborum commodo sunt quis commodo esse.",
  },
];

const Resources = () => {

  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(0)
  const displayPerPage = 10
  const totalElements = 0;//just for now

  const {id, email, firstname, lastname, fullname, occupation, gender} = useEmployeeProfile()

  return (
    <div className="w-full bg-white my-8">
      <main className="max-w-6xl p-3 mx-auto">
        <h1 className="font-semibold py-6 text-xl mb-6">
          Hola, {fullname}!
        </h1>

        <ResourceBanner/>

        <ResourcesVideos videos={videos}/>

        <section className="my-20">
          <Paginator
              currentPaginationIndex={currentPaginationIndex}
              setCurrentPaginationIndex={setCurrentPaginationIndex}
              total={totalElements}
              displayPerPage={displayPerPage}
          />
        </section>
      </main>
    </div>
  );
};

export default Resources;
