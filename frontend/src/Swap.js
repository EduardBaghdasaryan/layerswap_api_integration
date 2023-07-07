import { useGetSwap, useCancelSwap } from "./hooks";
import { Grid, Avatar, Typography, Paper, Button } from "@mui/material";
import { useState } from "react";
import { css } from "@emotion/react";

const classes = {
  root: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
  `,
  logo: css`
    width: 80px;
    height: 80px;
    margin-bottom: 8px;
  `,
  subtitle: css`
    margin-bottom: 5px;
  `,
};

export default function Swap() {
  const { swap } = useGetSwap();
  const { cancelSwap } = useCancelSwap();

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

  const getCancelSwap = () => {
    cancelSwap();
  };

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
                App Name: {swap.app_name}
              </Typography>
            </Paper>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                onClick={showJSON}
              >
                Show JSON
              </Button>
            </Grid>
            <Grid item>
              {jsonDisplay && (
                <Paper className={classes.root}>
                  <Typography variant="body1">
                    <pre>{jsonData}</pre>
                  </Typography>
                </Paper>
              )}{" "}
            </Grid>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              onClick={getCancelSwap}
            >
              Cancel swap
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
