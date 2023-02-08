import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

export const NavBar = () => {
  return (
    <Box sx={{ flexBrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>SocialUp</Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained">Login</Button>
                  <Button variant="contained">Register</Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
