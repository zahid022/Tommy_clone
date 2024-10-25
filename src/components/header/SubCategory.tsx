import { Link, useNavigate } from 'react-router-dom';
import { useAllSubByIdQuery } from '../../store/Api';
import { SubCategory } from '../../types/Type';

interface SubcategoryTypeComponent {
    id: string;
    name: string;
}

function SubCategoryComp({ id, name }: SubcategoryTypeComponent) {
    const { data, isLoading } = useAllSubByIdQuery(id)

    const navigate = useNavigate()

    return (
        <ul>
            {!isLoading &&
                data && data.map((item: SubCategory, i: number) =>
                    <li
                        onClick={() => {
                            navigate({
                                pathname: 'products',
                                search: `?category=${name}&subCategory=${item.slug}`
                            }, { replace: true });
                        }}
                        className='text-[14px] cursor-pointer font-medium duration-300 hover:underline text-[#00174f] mb-2'
                        key={i}>{item.name}</li>
                )
            }
        </ul>
    )
}

export default SubCategoryComp