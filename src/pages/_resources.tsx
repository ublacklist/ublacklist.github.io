import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import React from "react";
import type { ResourceList } from "../../community/types.ts";

const subscribeEmoji = "➕";

function translateCategory(category: string): string {
  const id = `pages.communityRulesets.${category.replaceAll(
    /-([a-z])/g,
    (_, c) => c.toUpperCase(),
  )}`;
  return translate({ id });
}

export function Resources(props: {
  resources: ResourceList;
  makeSubscriptionLink: (url: string) => string;
}) {
  return Object.entries(props.resources).map(
    ([category, resources], categoryIndex) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: The list is static
      <React.Fragment key={categoryIndex}>
        <h2 id={category}>{translateCategory(category)}</h2>
        <ul>
          {resources.map((resource, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: The list is static
            <li key={index}>
              <Link to={resource.homepage}>{resource.name}</Link>
              {resource.author && (
                <>
                  {" by "}
                  {typeof resource.author === "string" ? (
                    resource.author
                  ) : resource.author.url ? (
                    <Link to={resource.author.url}>{resource.author.name}</Link>
                  ) : (
                    resource.author.name
                  )}
                </>
              )}
              {resource.description && (
                <>
                  {" - "}
                  {resource.description}
                </>
              )}
              {resource.subscription && (
                <>
                  {" "}
                  <Link to={props.makeSubscriptionLink(resource.subscription)}>
                    {subscribeEmoji}
                  </Link>
                </>
              )}
              {resource.subitems && resource.subitems.length > 0 && (
                <ul>
                  {resource.subitems.map((subitem, subIndex) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: The list is static
                    <li key={subIndex}>
                      {subitem.name}
                      {subitem.description && (
                        <>
                          {" - "}
                          {subitem.description}
                        </>
                      )}
                      {subitem.subscription && (
                        <>
                          {" "}
                          <Link
                            to={props.makeSubscriptionLink(
                              subitem.subscription,
                            )}
                          >
                            {subscribeEmoji}
                          </Link>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </React.Fragment>
    ),
  );
}

export function makeResourcesTOC(resources: ResourceList) {
  return Object.keys(resources).map((category) => ({
    value: translateCategory(category),
    id: category,
    level: 2,
  }));
}
