import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context";
import axios from "axios";

function Dashboard() {
  const { user } = useGlobalContext();
  const { name, userId, role } = user;
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { count, products },
        } = await axios.get(
          `https://e-commerce-tutorial.herokuapp.com/api/v1/products`
        );
        setCount(count);
        setProducts(products);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Wrapper className="page">
        <h2>Hello there, {user.name}</h2>
        <p>
          Your ID : <span>{userId}</span>
        </p>
        <p>
          Your Role : <span>{role}</span>
        </p>
        {/* <p>CART...</p> */}
        <p>
          PRODUCTS: <span>{count}</span>
        </p>
        <div>
          {products ? (
            products.map(({ id, name, price, company, category }) => (
              <div key={id}>
                <p>
                  <span>{category}</span> {company}
                </p>
                <p>
                  <strong>{name?.toUpperCase()}</strong>: $ {price / 100}
                </p>
                <hr />
              </div>
            ))
          ) : (
            <p>no products...</p>
          )}
        </div>
        {/* <Link to="/checkout" className="btn">
          Go to payment
        </Link> */}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  p span {
    background: var(--primary-500);
    padding: 0.15rem 0.25rem;
    color: var(--white);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
  }
`;

export default Dashboard;
