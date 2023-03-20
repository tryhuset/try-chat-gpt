import styled from "@emotion/styled";
import { Button } from "@mantine/core";
import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectOpenAIApiKey } from "../../store/api-keys";
import { openOpenAIApiKeyPanel } from "../../store/settings-ui";
import { Page } from "../page";
import Login from "../login";
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

export default function LandingPage(props: any) {
    const openAIApiKey = useAppSelector(selectOpenAIApiKey);
    const dispatch = useAppDispatch();
    const onConnectButtonClick = useCallback(
        () => dispatch(openOpenAIApiKeyPanel()),
        [dispatch]
    );
    const { isAuthenticated, user } = useAuth0();

    if (!isAuthenticated) {
        return <Login></Login>;
    }

    return (
        <Page id={"landing"} showSubHeader={true}>
            <Container>
                <p>
                    <FormattedMessage
                        defaultMessage={`Hei! Hvordan kan jeg hjelpe deg i dag?`}
                        description="A friendly message that appears at the start of new chat sessions"
                    />
                </p>
            </Container>
        </Page>
    );
}
