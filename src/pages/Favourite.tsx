import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context';

const ResultsList = React.lazy(() => import('../components/ResultsList'));

interface FavResults {
  catogery?: string;
  id?: number;
  name?: string;
  poster_path?: string;
  title?: string;
}

const Favourite: React.FC<any> = () => {

  const [results, setResults] = useState<FavResults[]>();
  const context = useContext<any>(UserContext);

  useEffect(() => {
    setResults(context.favourites.map(r => ({...r, image: {...r.image, url: r.image?.url.replace('_V1_', '_SX100_')}})));
    return () => setResults([]);
  }, [context.favourites]);

  const getContent = () => {
    if (typeof context.user === 'undefined' || context.user === null) {
      return <h1>Login to view favourites</h1>
    }

    if (results && results.length > 0) {
      return <ResultsList results={results} />
    }
    else if (results && results.length === 0) {
      return <>No favourites :( <br />Add some</>
    }
    return <IonProgressBar type="indeterminate" />
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Favourites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {getContent()}
      </IonContent>
    </IonPage>
  )
}

export default Favourite;