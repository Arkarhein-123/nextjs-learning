import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addToCart } from "./cartSlice";

interface ButtonProps {
    id: string;
    name: string;
    price: number;
    image: string;
}

export default function AddToCartButton({ id, name, price, image }: ButtonProps) {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <>
                <button
                    className="bg-blue-700 px-4 py-3 mx-2 my-4 rounded-md text-white 
                          hover:bg-blue-800 transition-colors ease-in-out"
                    onClick={() => dispatch(addToCart({ id, name, price, image }))}
                >
                    Add To Cart
                </button>
            </>
        </div>
    );
}
