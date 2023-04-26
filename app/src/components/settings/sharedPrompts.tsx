import SettingsTab from "./tab";
import SettingsOption from "./option";
import { Card, Text, Button } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";

function IconCopy(props) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z" />
    </svg>
  );
}

export default function SharedPromptsTab() {
  const intl = useIntl();

  const [sharedPrompts, setSharedPrompts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://trydigchatgpt.azurewebsites.net/api/sharedSystemPrompts")
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => {
          if (a.timeStamp < b.timeStamp) {
            return 1;
          }
          if (a.timeStamp > b.timeStamp) {
            return -1;
          }
          return 0;
        });
        setSharedPrompts(data);
      });
  }, []);

  const sharedSystemPromptsSection = useMemo(
    () => (
      <SettingsOption
        heading={intl.formatMessage({
          defaultMessage: "Shared System Prompts by other Try users",
          description: "Heading for the Shared Prompts tab",
        })}
      >
        {sharedPrompts.map((prompt) => (
          <Card
            shadow="sm"
            radius="md"
            style={{ marginTop: "1rem" }}
            key={prompt.partitionKey}
          >
            <Text fz="xs" inline>
              Shared by: {prompt.userName}
            </Text>
            <Text fz="sm" style={{ marginTop: "0.5rem" }} weight={500} inline>
              {prompt.systemPrompt}
            </Text>
            {/* Button to copy the systemPrompt */}
            <Button
              variant="light"
              radius="xl"
              size="sm"
              style={{ marginTop: "0.5rem" }}
              rightIcon={<IconCopy />}
              styles={{
                root: { paddingRight: 14, height: 38 },
                rightIcon: { marginLeft: 12 },
              }}
              onClick={() => navigator.clipboard.writeText(prompt.systemPrompt)}
            >
              Copy to clipboard
            </Button>
          </Card>
        ))}
      </SettingsOption>
    ),
    [sharedPrompts, intl]
  );

  const elem = useMemo(
    () => (
      <SettingsTab name="Shared Prompts">
        {sharedSystemPromptsSection}
      </SettingsTab>
    ),
    [sharedSystemPromptsSection]
  );

  return elem;
}
