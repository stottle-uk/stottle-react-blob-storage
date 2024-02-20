import React, { useState } from "react";
import ContainerList from './azure-storage/components/ContainerList';
import InputFile from './azure-storage/components/InputFile';
import ItemsDeleted from './azure-storage/components/ItemsDeleted';
import ItemsDownloaded from './azure-storage/components/ItemsDownloaded';
import ItemsList from './azure-storage/components/ItemsList';
import ItemsUploaded from './azure-storage/components/ItemsUploaded';
import SelectedContainer from './azure-storage/components/SelectedContainer';
import Header from './layout/Header';
import "./test.css";

interface profileView {
  name: string;
}

const App: React.FC = () => {
  const [profile, setProfile] = useState<profileView>({name:"VENDOR"});
  const UserContext = React.createContext<profileView>({
    name: profile.name
  });
  const onProfileClick = (profileView:string) => {
    if (profileView === "VENDOR") {
      setProfile({name:"FORVARSMATERIELL"});
      console.log(profile);
    } else {
      setProfile({name:"VENDOR"});
      console.log(profile);
    }
  };
      return(
  <>
    <button className="button-21" onClick={() => onProfileClick(profile.name)}>{profile.name==="VENDOR"?("SUPPLIER"):(profile.name)}</button>
    <Header/>

    <hr />
      <UserContext.Provider value={profile}>
        <ContainerList user={profile.name}/>
      </UserContext.Provider>
    <hr />
    <SelectedContainer className="container">
      <InputFile />
        <UserContext.Provider value={profile}>

        <ItemsList user={profile.name} />
        </UserContext.Provider>
      <div className="item-details">
        {profile.name==="VENDOR"? (
          <ItemsUploaded />
        ):(
        <div>
        <ItemsUploaded/>        
        <ItemsDownloaded />
        <ItemsDeleted />
        </div>
        )}
          
      </div>
    </SelectedContainer>
  </>
);
}

export default App;


