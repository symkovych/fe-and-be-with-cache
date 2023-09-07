import { screen, within } from "@testing-library/react";
/* eslint-disable testing-library/no-node-access */
import { TestIDs, dummyVideosData } from "../constans";
import { render } from "../test-utils";
import Cards from "../components/Cards";

test("Cards component", async () => {
  render(
    <Cards
      addToFavoriteMovies={() => {}}
      deleteFromFaviteMovies={() => {}}
      cards={dummyVideosData}
      favoriteMovies={[dummyVideosData[0]]}
    />
  );

  const cards = screen.getByTestId(TestIDs.CARDS);
  expect(cards.childElementCount).toEqual(dummyVideosData.length);

  const card1 = within(screen.getByTestId(dummyVideosData[0].id));
  expect(card1.getByText("Added to favorite")).toBeVisible();

  const card1Title = card1.getByText(dummyVideosData[0].title);
  const card1Description = card1.getByText(dummyVideosData[0].overview);

  expect(card1Title).toBeVisible();
  expect(card1Description).toBeVisible();

  const card2 = within(screen.getByTestId(dummyVideosData[1].id));
  expect(card2.getByText("Add to favorite")).toBeVisible();
});
