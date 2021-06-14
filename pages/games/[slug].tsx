import React from "react";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../src/database";

type Games = {
  name: string;
  slug: string;
};

type GamesToProps = {
  games: Games[];
};

const Getgames: React.FC<GamesToProps> = ({ games }) => {
  return (
    <div className="title">
      <h1>Games List page</h1>
      {games.map((game) => {
        return (
          <div>
            <a href="#">{game.name}</a>
          </div>
        );
      })}
    </div>
  );
};

export default Getgames;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mongodb = await getDatabase();

  const games = await mongodb.db().collection("games").find().toArray();

  return {
    props: {
      games: games.map((game) => {
        return {
          name: game.name,
          slug: game.slug,
        };
      }),
    },
  };
};
