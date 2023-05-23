import React from "react";
import { Text, Timeline, Accordion } from "@mantine/core";

const SaleIgProjectTagHistory = ({ history }) => {
  return (
    <Accordion.Item value="history">
      <Accordion.Control
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
        }
      >
        Tarihçe
      </Accordion.Control>
      <Accordion.Panel>
        <Timeline active={history.length} bulletSize={24} lineWidth={2}>
          {history.map((item, index) => {
            return (
              <Timeline.Item
                className="mt-3"
                key={index}
                title={item.userName}
                bullet={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              >
                <Text color="dimmed" size="sm">
                  {item.historyText}
                </Text>
                <Text size="xs" mt={4}>
                  {new Date(item.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </Text>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default SaleIgProjectTagHistory;
