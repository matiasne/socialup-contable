import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SocialUp
          </Typography>
          <div>
            <Container maxWidth="xl">
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
