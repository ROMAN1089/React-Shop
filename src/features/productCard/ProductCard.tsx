import React, { useRef } from "react";
import { Iproduct } from "../../entities/products/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../../entities/cart/cartSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { IcartItem } from "../../entities/cart/types";
import { AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./ProductCard.css";

interface IproductCardProps {
  product: Iproduct;
}

const ProductCard: React.FC<IproductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const cartIconRef = useRef<HTMLButtonElement | null>(null);

  const handleAddToCart = () => {
    const cartItem: IcartItem = {
      ...product,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));

    if (boxRef.current && cartIconRef.current) {
      const box = boxRef.current;
      const cartIcon = cartIconRef.current;

      gsap.to(box, {
        duration: 0.3,
        x:
          cartIcon.getBoundingClientRect().left -
          box.getBoundingClientRect().left,
        y:
          cartIcon.getBoundingClientRect().top -
          box.getBoundingClientRect().top,
        ease: "power3.out",
        onComplete: () => {
          box.style.display = "none";
        },
      });
    }
  };

  return (
    <>
      <Card className="product-card">
        <CardHeader>
          <CardTitle
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
          </CardTitle>
          <CardDescription className="product-category">
            {product.category}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="product-title">{product.title}</p>
          <p className="product-price">Цена: ${product.price}</p>
        </CardContent>
        <CardFooter className="product-footer">
          <Button onClick={handleAddToCart} ref={cartIconRef} variant="outline">
            Добавить в корзину
          </Button>
        </CardFooter>
        <div className="box" ref={boxRef}>
          🛒
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
