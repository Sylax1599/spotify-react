import { useRecoilTransactionObserver_UNSTABLE } from "recoil";

export const keysAbleToSave = ["spotifyRefreshToken", "spotifyTokenResponse", "isAuthenticated"];

export default function DebugObserver() {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    for (const modifiedAtom of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      const atom = snapshot.getLoadable(modifiedAtom);
      if (atom.state === "hasValue" && keysAbleToSave.indexOf(modifiedAtom.key) !== -1) {
        localStorage.setItem(modifiedAtom.key, JSON.stringify({ value: atom.contents }));
      }
    }
  });

  return null;
}


//esto es para parsistir la informacion, es decir para que quede guardado en el 
//local storage del navegador, para que el usuario no tenga que iniciar sesion una y otra vez
