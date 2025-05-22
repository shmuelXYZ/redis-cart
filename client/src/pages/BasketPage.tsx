import { useNavigate } from 'react-router-dom';
export default function BasketPage() {
  const navigate = useNavigate();
  // const [products, setProducts] = useState<Product[]>([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/basket');
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error('Error fetching basket data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <button onClick={() => navigate(-1)} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
        Go back
      </button>
      <h1>BasketPage</h1>
    </div>
  );
}
