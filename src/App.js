import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'

// const geocodeURL = "https://us1.locationiq.com/v1/search.php?key=YOUR_PRIVATE_TOKEN&q=SEARCH_STRING&format=json"
// let key = "e12621471dbd04"
// let latLng = [];
// const geo = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${state}&format=json`
// states.forEach((state) => {
//   fetch(geo).then((res) => res.json()).then((data) => latLng.push(data[0]))
// })

//Static placeholder markers
let placeholderMarkers = [
  {
    lat: "54.7023545",
    lon: "107.5912997",
    display_name: "United Kingdom"
  },
  {
    lat: "39.5695818",
    lon: "117.5912997",
display_name: "Palma, Balearic Islands, Spain"
  },
  {
    lat: "6.4550575",
    lon: "107.5912997",
display_name: "Lagos, Lagos Island, Lagos, 100242, Nigeria"
  },
  {
    lat: "-33.928992",
    lon: "107.5912997",
display_name: "Cape Town, City of Cape Town, Western Cape"
  },
  {
    lat: "34.0536909",
lon: "118.2427666",
display_name: "Los Angeles, Los Angeles County, California"
  },
  {
    lat: "31.5313113",
    lon: "107.5912997",
display_name: "Israel"
  },
  {
    lat: "45.5202471",
lon: "122.6741949",
display_name: "Portland, Multnomah County, Oregon, USA"
  },
  {
    lat: "-19.9527237",
lon: "127.5912997",
display_name: "Philadelphia, Philadelphia County, Pennsylvania, USA"
  },
  {
    lat: "40.8088861",
lon: "137.5912997",
display_name: "Lincoln, Lancaster County, Nebraska, USA"
  },
  {
    lat: "55.9533456",
lon: "157.5912997",
display_name: "Edinburgh, City of Edinburgh, Scotland,"
  },
  {
    lat: "12.9791198",
lon: "167.5912997",
display_name: "Bengaluru, Bangalore North, Bangalore Urban"
  }

]

// console.log(process.env.REACT_APP_API_KEY)
// let airtable = fetch("https://api.airtable.com/v0/appKPpuxHmcbNwiY5/Cassandra?view=Master",{
//   headers:{
//     Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
//   }
// })
// .then((res) => res.json()).then((data) => data.records.forEach((record) => members.push(record)))
// console.log("Members",members)

// let states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://anant.us">
        Anant
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];



export default function App() {
  const classes = useStyles();
  const [members, setMembers] = useState([]);
  const [states, setStates] = useState([]);

  let airtable = async () => {
    await fetch("https://api.airtable.com/v0/appKPpuxHmcbNwiY5/Cassandra?view=Master", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      }
    })
      .then((res) => res.json()).then((data) => {
        console.log("DATA", data);
        setMembers(data.records);
      })
  }

  if (members.length === 0) {
    airtable();
  }


  if (states.length === 0) {
    let newMembers = members;
    const shuffled = newMembers.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 25);
    for (let i = 0; i < selected.length; i++) {
      states.push(selected[i].fields.City);
    }
  }

  console.log("STATES!!!", states);
  let key = "e12621471dbd04"
  let latLng = [];
  states.forEach((state) => {
    // setTimeout(fetch(`https://us1.locationiq.com/v1/search.php?key=${key}&q=${state}&format=json`).then((res) => res.json()).then((data) => latLng.push(data[0])), 4000);
    fetch(`https://us1.locationiq.com/v1/search.php?key=${key}&q=${state}&format=json`).then((res) => res.json()).then((data) => latLng.push(data[0]))
  })
  console.log("LATLNG!!!", latLng);



  const map = (
    <Map center={[40.879, 4.6997]} zoom={2} width={1000} height={575} touchEvents={false} mouseEvents={false}>
      {placeholderMarkers.map((marker) => <Marker anchor={[marker.lat, marker.lon]} onClick={({ event, anchor, payload }) => {console.log(marker.display_name) }} />)}
      {/* <Marker anchor={[36.2048, 138.2529]} onClick={({ event, anchor, payload }) => { }} />
      <Marker anchor={[52.5200, 13.4050]} onClick={({ event, anchor, payload }) => { }} />
      <Marker anchor={[23.6345, 102.5528]} onClick={({ event, anchor, payload }) => { }} />
      <Marker anchor={[37.0902, -100.7129]} onClick={({ event, anchor, payload }) => { }} />
      <Marker anchor={[23.6345, 0.5528]} onClick={({ event, anchor, payload }) => { }} />
      <Marker anchor={[-23.6345, -65.5528]} onClick={({ event, anchor, payload }) => { }} /> */}



      <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
        {/* <img src='pigeon.jpg' width={6400} height={5580} alt='' /> */}
      </Overlay>
    </Map>
  )



  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Cassandra.Network
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, molestiae neque placeat reiciendis est deserunt, ut molestias quia recusandae asperiores qui dolore quod. Accusamus, quo?
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{"color": "red"}}>MARKERS CURRENTLY CONSOLE LOGS GROUP NAME</p>
          {map}
        </div>
        <Container maxWidth="sm">
          <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
            Starting or running a local Apache® Cassandra™ Group?
            </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            If you are running (or looking to run) an Apache Spark meetup, we would like to provide these resources – Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta culpa officia numquam? Fuga sed doloribus magni provident! Maxime debitis nihil iusto itaque cupiditate, consectetur animi quasi repellendus inventore, facilis minus.
            </Typography>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {members.map(member => (
              <Grid item key={member} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {member.fields['Group Name']}
                    </Typography>
                    <br />
                    <Typography>
                      City: {member.fields.City}
                    </Typography>
                    <Typography>
                      Organizer: {member.fields['Organizer Name']}
                    </Typography>
                    <a href={member.fields['Organizer LinkedIn']}>
                      {member.fields['Organizer LinkedIn']}
                    </a>
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions> */}
                </Card>
              </Grid>
            ))}

          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        {/* <Typography variant="h6" align="center" gutterBottom>
        © 2020 Anant Corporation, All Rights Reserved.
        </Typography> */}
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          © 2020 Anant Corporation, All Rights Reserved.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}