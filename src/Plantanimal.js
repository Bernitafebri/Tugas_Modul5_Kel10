import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Modal from "react-modal";
import Button from '@mui/material/Button';

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      color: "blue",
    },
  };
  
  const ShowContext = createContext();
  Modal.setAppElement("#root");

function Plantanimal() {
    const [valShow, setValShow] = useState("Plant");
    return (
        <ShowContext.Provider value={valShow}>
            <div>
            <Button style={{ marginRight: "10px", marginLeft: "20px" }}  color="success" variant="contained" onClick={() => setValShow("Plant")}>Tumbuhan</Button>
            <Button  color="success" variant="contained" onClick={() => setValShow("Animal")}>Hewan</Button>
            </div>
            <Content />
        </ShowContext.Provider>
    )
}

function Content() {
    return (
      <div>
        <Data />
      </div>
    );
  }

  function Data() {
    const [makhluk, setMakhluk] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentDetail, setCurrentDetail] = useState({});
    const show = useContext(ShowContext);
  
    function OpenModal(id, nama, title, familia, desc) {
      setCurrentDetail({
        id: id,
        nama: nama,
        title: title,
        familia: familia,
        desc: desc,
      });
  
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }
  
    useEffect(() => {
      axios({
        method: "GET",
        url: `http://localhost:3000/${show}`,
        headers: {
          accept: "/",
        },
      })
        .then((data) => {
          console.log(data.data);
          setMakhluk([...data.data]);
          // console.log(state.Buku)
        })
        .catch((error) => {
          console.log(error);
        });
    }, [show]);
  
    return (
      <div>
        <Grid
          container
          spacing={4}
          style={{ marginTop: "50px", paddingLeft: "20px", paddingRight: "20px"}}
        >
          {makhluk.map((result) => {
            return (
              <Grid item key={result.id} md={10}>
                <Card variant="outlined">
                  <CardActionArea
                    onClick={() =>
                      OpenModal(
                        result.id,
                        result.nama,
                        result.title,
                        result.familia,
                        result.desc
                      )
                    }
                  >
                    <Typography variant="h5" color="secondary" style={{ marginLeft: "10px"}}>{result.title}</Typography>
                    <Typography style={{ marginLeft: "10px"}}>{result.familia}</Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <Typography>Id : {currentDetail.id}</Typography>
            <Typography>Nama : {currentDetail.nama}</Typography>
            <Typography>Title : {currentDetail.title}</Typography>
            <Typography>Familia : {currentDetail.familia}</Typography>
            <Typography>Deskripsi : {currentDetail.desc}</Typography>
          </Modal>
        </Grid>
      </div>
    );
  }


export default Plantanimal
