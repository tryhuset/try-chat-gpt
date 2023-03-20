import { Page } from "./page";
import { Button } from "@mantine/core";
import styled from "@emotion/styled";
import { useAuth0 } from "@auth0/auth0-react";

const Container = styled.div`
    flex-grow: 1;
    padding-bottom: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Work Sans", sans-serif;
    line-height: 1.7;
    gap: 1rem;
`;

export default function Login(props: any) {
    const { loginWithRedirect, error, user, logout } = useAuth0();
    return (
        <Page id={"landing"} withChrome={false} showSubHeader={false}>
            <Container>
                {error && (
                    <>
                        <p>Du må logge inn med en TRY.no-konto</p>
                        <Button
                            onClick={() =>
                                logout({
                                    logoutParams: {
                                        returnTo: window.location.origin,
                                    },
                                })
                            }
                        >
                            Logg ut
                        </Button>
                    </>
                )}
                {!error && (
                    <>
                        <p>Du må logge inn for å fortsette</p>

                        <Button onClick={() => loginWithRedirect()}>
                            Logg inn
                        </Button>
                    </>
                )}
            </Container>
        </Page>
    );
}
