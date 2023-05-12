import { usePermission } from "../../hooks/setting/usePermission";
import Loader from "../../components/loader/Loader";

export default function AccordionDenyItem({
  index,
  item,
  can,
  menu,
  setRefresh,
}) {
  const { addPermission, isLoading } = usePermission();
  const handlePermission = async (e) => {
    e.preventDefault();
    const result = await addPermission(menu, item, can);
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
          className="h-6 w-6 cursor-pointer text-red-500"
          onClick={handlePermission}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="ml-2">{item}</span>
      </div>
    </>
  );
}
