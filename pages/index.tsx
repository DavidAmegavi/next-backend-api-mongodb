import React from "react";
import * as mongo from "mongodb";
import { getDatabase } from "../src/database";
import { GetServerSideProps } from "next";

type Games = {
  name: string;
  slug: string;
  cover: string;
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
            <a href={`/games/${game.slug}`}>{game.name}</a>
          </div>
        );
      })}
    </div>
  );
};

export default Getgames;

export const getServerSideProps: GetServerSideProps = async () => {
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
