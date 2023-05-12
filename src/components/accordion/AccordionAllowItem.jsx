import { usePermission } from "../../hooks/setting/usePermission";
import Loader from "../../components/loader/Loader";

export default function AccordionAllowItem({
  index,
  item,
  can,
  menu,
  setRefresh,
}) {
  const { removePermission, isLoading } = usePermission();
  const handlePermission = async (e) => {
    e.preventDefault();
    const result = await removePermission(menu, item, can);
    if (result) {
      setRefresh(Date.now().toString());
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div key={index} className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 cursor-pointer text-green-500"
          onClick={handlePermission}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="ml-2">{item}</span>
      </div>
    </>
  );
}
