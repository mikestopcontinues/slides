// import

import {Deck, Slide, Heading} from 'spectacle';

import {theme} from 'app/libs/theme';

// vars

// component

export function App() {
  return (
    <Deck theme={theme}>
      <Slide backgroundColor="white">
        <Heading color="blue">Tentpole Websites</Heading>
      </Slide>
    </Deck>
  );
}
