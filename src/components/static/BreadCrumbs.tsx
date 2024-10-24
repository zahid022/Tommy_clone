import { useNavigate } from "react-router-dom";

interface breadCrumbsType {
  category: string | undefined;
  subCategory: string | undefined;
  categoryName: string | undefined
}

function BreadCrumbs({ category, categoryName, subCategory }: breadCrumbsType) {
  const navigate = useNavigate()
  return (
    <div className="flex capitalize mb-2 pl-2 gap-1 text-[#484848] text-[12px] items-center">
      <div
        className="cursor-pointer hover:underline"
        onClick={() => {
          navigate({
            pathname: '/en/products',
            search: `?category=${categoryName}`
          }, { replace: true });
        }}>
        {categoryName}
      </div> /
      <div
        onClick={() => {
          navigate({
            pathname: '/en/products',
            search: `?category=${categoryName}&generalCategory=${category}`
          }, { replace: true });
        }}
        className="cursor-pointer hover:underline">
        {category}
      </div> /
      <div
        onClick={() => {
          navigate({
            pathname: '/en/products',
            search: `?category=${categoryName}&subCategory=${subCategory}`
          }, { replace: true });
        }}
        className="cursor-pointer hover:underline">
        {subCategory}
      </div>
    </div>
  )
}

export default BreadCrumbs