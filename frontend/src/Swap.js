import { useGetSwap } from "./hooks";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Avatar } from "@material-ui/core";
import { Grid, Button } from "@mui/material";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    marginBottom: theme.spacing(1),
  },
}));

export default function Swap() {
  const { swap } = useGetSwap();

  const [jsonDisplay, setJsonDisplay] = useState(false);
  const [jsonData, setJsonData] = useState(null);

  const showJSON = () => {
    if (jsonDisplay) {
      setJsonDisplay(false);
      setJsonData(null);
    } else {
      setJsonDisplay(true);
      setJsonData(JSON.stringify(swap, null, 2));
    }
  };

  const classes = useStyles();
  return (
    <>
      {swap.id && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Paper className={classes.root}>
              <Avatar
                className={classes.logo}
                alt={swap.from_network.display_name}
                src={swap.from_network.logo}
              />
              <Typography variant="subtitle1" className={classes.subtitle}>
                Status: {swap.status}
              </Typography>
              <Typography variant="h6">
                {swap.from_network.display_name}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                From: {swap.from}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                To: {swap.to}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Amount: {swap.amount}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Fee: {swap.fee}
              </Typography>
              <Avatar
                className={classes.logo}
                alt={swap.to_network.display_name}
                src={swap.to_network.logo}
              />
              <Typography variant="h6">
                {swap.to_network.display_name}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Asset: {swap.asset.name}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Source Address: {swap.source_address}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Destination Address: {swap.to_address}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Deposit Address: {swap.deposit_address}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Reference ID: {swap.reference_id}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                App Name: {swap.sapp_name}
              </Typography>
            </Paper>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              onClick={showJSON}
            >
              Show JSON
            </Button>
            {jsonDisplay && (
              <Paper className={classes.root}>
                <Typography variant="body1">
                  <pre>{jsonData}</pre>
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
}
