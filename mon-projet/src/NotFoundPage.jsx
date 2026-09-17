import { Link } from "react-router-dom";

function NotFoundPage(){

  return (
    <div className="container py-5 text-center"style={{marginTop:"150px", maxHeight:"650px",marginBottom:"150px"}}>

      <h1 className="display-1">
        404
      </h1>

      <h2>
        Page introuvable
      </h2>
      <br/>
      <Link className="btn btn-primary"to="/"style={{fontSize:"20px"}}>
        Retour à l'accueil
      </Link>

    </div>
  );

}

export default NotFoundPage;