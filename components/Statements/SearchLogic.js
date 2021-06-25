export const SearchLogic = (statements, searchValue) => {
  return statements.filter((items) => {
    const field =
      items.statement.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;

    return field
      ? true
      : items.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      ? true
      : items.statement.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      ? true
      : items.identifier.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      ? true
      : items.place.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      ? true
      : items.field.length >= 1
      ? items.field[0]
          .toLowerCase()
          .replace(/_/g, " ")
          .indexOf(searchValue.toLowerCase()) !== -1
        ? true
        : items.field.length >= 2
        ? items.field[1]
            .toLowerCase()
            .replace(/_/g, " ")
            .indexOf(searchValue.toLowerCase()) !== -1
          ? true
          : items.field.length >= 3
          ? items.field[2]
              .toLowerCase()
              .replace(/_/g, " ")
              .indexOf(searchValue.toLowerCase()) !== -1
            ? true
            : items.field.length >= 4
            ? items.field[3]
                .toLowerCase()
                .replace(/_/g, " ")
                .indexOf(searchValue.toLowerCase()) !== -1
              ? true
              : items.field.length >= 5
              ? items.field[4]
                  .toLowerCase()
                  .replace(/_/g, " ")
                  .indexOf(searchValue.toLowerCase()) !== -1
                ? true
                : items.field.length >= 6
                ? items.field[5]
                    .toLowerCase()
                    .replace(/_/g, " ")
                    .indexOf(searchValue.toLowerCase()) !== -1
                  ? true
                  : items.field.length >= 7
                  ? items.field[6]
                      .toLowerCase()
                      .replace(/_/g, " ")
                      .indexOf(searchValue.toLowerCase()) !== -1
                    ? true
                    : items.field.length >= 8
                    ? items.field[7]
                        .toLowerCase()
                        .replace(/_/g, " ")
                        .indexOf(searchValue.toLowerCase()) !== -1
                      ? true
                      : items.organization
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .indexOf(searchValue.toLowerCase()) !== -1
                      ? true
                      : items.keywords.length >= 1
                      ? items.keywords[0].label
                          .toLowerCase()
                          .indexOf(searchValue.toLowerCase()) !== -1
                        ? true
                        : items.keywords.length === 1
                        ? items.keywords[0].label
                            .toLowerCase()
                            .indexOf(searchValue.toLowerCase()) !== -1
                          ? true
                          : items.keywords.length >= 2
                          ? items.keywords[1].label
                              .toLowerCase()
                              .indexOf(searchValue.toLowerCase()) !== -1
                            ? true
                            : items.keywords.length >= 3
                            ? items.keywords[2].label
                                .toLowerCase()
                                .indexOf(searchValue.toLowerCase()) !== -1
                              ? true
                              : items.keywords.length >= 4
                              ? items.keywords[3].label
                                  .toLowerCase()
                                  .indexOf(searchValue.toLowerCase()) !== -1
                                ? true
                                : items.keywords.length >= 5
                                ? items.keywords[4].label
                                    .toLowerCase()
                                    .indexOf(searchValue.toLowerCase()) !== -1
                                  ? true
                                  : items.keywords.length >= 6
                                  ? items.keywords[5].label
                                      .toLowerCase()
                                      .indexOf(searchValue.toLowerCase()) !== -1
                                    ? true
                                    : items.keywords.length >= 7
                                    ? items.keywords[6].label
                                        .toLowerCase()
                                        .indexOf(searchValue.toLowerCase()) !==
                                      -1
                                      ? true
                                      : items.keywords.length >= 8
                                      ? items.keywords[7].label
                                          .toLowerCase()
                                          .indexOf(
                                            searchValue.toLowerCase()
                                          ) !== -1
                                        ? true
                                        : items.keywords.length >= 9
                                        ? items.keywords[8].label
                                            .toLowerCase()
                                            .indexOf(
                                              searchValue.toLowerCase()
                                            ) !== -1
                                          ? true
                                          : items.keywords.length >= 10
                                          ? items.keywords[9].label
                                              .toLowerCase()
                                              .indexOf(
                                                searchValue.toLowerCase()
                                              ) !== -1
                                            ? true
                                            : items.keywords.length >= 11
                                            ? items.keywords[10].label
                                                .toLowerCase()
                                                .indexOf(
                                                  searchValue.toLowerCase()
                                                ) !== -1
                                              ? true
                                              : items.keywords.length >= 12
                                              ? items.keywords[11].label
                                                  .toLowerCase()
                                                  .indexOf(
                                                    searchValue.toLowerCase()
                                                  ) !== -1
                                                ? true
                                                : items.keywords.length >= 13
                                                ? items.keywords[12].label
                                                    .toLowerCase()
                                                    .indexOf(
                                                      searchValue.toLowerCase()
                                                    ) !== -1
                                                  ? true
                                                  : items.keywords.length >= 14
                                                  ? items.keywords[13].label
                                                      .toLowerCase()
                                                      .indexOf(
                                                        searchValue.toLowerCase()
                                                      ) !== -1
                                                    ? true
                                                    : items.keywords.length >=
                                                      15
                                                    ? items.keywords[14].label
                                                        .toLowerCase()
                                                        .indexOf(
                                                          searchValue.toLowerCase()
                                                        ) !== -1
                                                      ? true
                                                      : items.keywords.length >=
                                                        16
                                                      ? items.keywords[15].label
                                                          .toLowerCase()
                                                          .indexOf(
                                                            searchValue.toLowerCase()
                                                          ) !== -1
                                                        ? true
                                                        : items.keywords
                                                            .length >= 17
                                                        ? items.keywords[16].label
                                                            .toLowerCase()
                                                            .indexOf(
                                                              searchValue.toLowerCase()
                                                            ) !== -1
                                                          ? true
                                                          : items.keywords
                                                              .length >= 18
                                                          ? items.keywords[17].label
                                                              .toLowerCase()
                                                              .indexOf(
                                                                searchValue.toLowerCase()
                                                              ) !== -1
                                                            ? true
                                                            : items.keywords
                                                                .length >= 19
                                                            ? items.keywords[18].label
                                                                .toLowerCase()
                                                                .indexOf(
                                                                  searchValue.toLowerCase()
                                                                ) !== -1
                                                              ? true
                                                              : items.keywords
                                                                  .length >= 20
                                                              ? items.keywords[19].label
                                                                  .toLowerCase()
                                                                  .indexOf(
                                                                    searchValue.toLowerCase()
                                                                  ) !== -1
                                                                ? true
                                                                : items.keywords
                                                                    .length >=
                                                                  21
                                                                ? items.keywords[20].label
                                                                    .toLowerCase()
                                                                    .indexOf(
                                                                      searchValue.toLowerCase()
                                                                    ) !== -1
                                                                  ? true
                                                                  : items
                                                                      .keywords
                                                                      .length >=
                                                                    22
                                                                  ? items.keywords[21].label
                                                                      .toLowerCase()
                                                                      .indexOf(
                                                                        searchValue.toLowerCase()
                                                                      ) !== -1
                                                                    ? true
                                                                    : items
                                                                        .keywords
                                                                        .length >=
                                                                      23
                                                                    ? items.keywords[22].label
                                                                        .toLowerCase()
                                                                        .indexOf(
                                                                          searchValue.toLowerCase()
                                                                        ) !== -1
                                                                      ? true
                                                                      : items
                                                                          .keywords
                                                                          .length >=
                                                                        24
                                                                      ? items.keywords[23].label
                                                                          .toLowerCase()
                                                                          .indexOf(
                                                                            searchValue.toLowerCase()
                                                                          ) !==
                                                                        -1
                                                                        ? true
                                                                        : items
                                                                            .keywords
                                                                            .length >=
                                                                          25
                                                                        ? items.keywords[24].label
                                                                            .toLowerCase()
                                                                            .indexOf(
                                                                              searchValue.toLowerCase()
                                                                            ) !==
                                                                          -1
                                                                          ? true
                                                                          : items
                                                                              .keywords
                                                                              .length >=
                                                                            26
                                                                          ? items.keywords[25].label
                                                                              .toLowerCase()
                                                                              .indexOf(
                                                                                searchValue.toLowerCase()
                                                                              ) !==
                                                                            -1
                                                                            ? true
                                                                            : items
                                                                                .keywords
                                                                                .length >=
                                                                              27
                                                                            ? items.keywords[26].label
                                                                                .toLowerCase()
                                                                                .indexOf(
                                                                                  searchValue.toLowerCase()
                                                                                ) !==
                                                                              -1
                                                                              ? true
                                                                              : items
                                                                                  .keywords
                                                                                  .length >=
                                                                                28
                                                                              ? items.keywords[27].label
                                                                                  .toLowerCase()
                                                                                  .indexOf(
                                                                                    searchValue.toLowerCase()
                                                                                  ) !==
                                                                                -1
                                                                                ? true
                                                                                : items
                                                                                    .keywords
                                                                                    .length >=
                                                                                  29
                                                                                ? items.keywords[28].label
                                                                                    .toLowerCase()
                                                                                    .indexOf(
                                                                                      searchValue.toLowerCase()
                                                                                    ) !==
                                                                                  -1
                                                                                  ? true
                                                                                  : items
                                                                                      .keywords
                                                                                      .length >=
                                                                                    30
                                                                                  ? items.keywords[29].label
                                                                                      .toLowerCase()
                                                                                      .indexOf(
                                                                                        searchValue.toLowerCase()
                                                                                      ) !==
                                                                                    -1
                                                                                    ? true
                                                                                    : items
                                                                                        .keywords
                                                                                        .length >=
                                                                                      31
                                                                                    ? items.keywords[30].label
                                                                                        .toLowerCase()
                                                                                        .indexOf(
                                                                                          searchValue.toLowerCase()
                                                                                        ) !==
                                                                                      -1
                                                                                      ? true
                                                                                      : items.youTubeURLDescription
                                                                                          .toLowerCase()
                                                                                          .indexOf(
                                                                                            searchValue.toLowerCase()
                                                                                          ) !==
                                                                                        -1
                                                                                      ? true
                                                                                      : null
                                                                                    : null
                                                                                  : null
                                                                                : null
                                                                              : null
                                                                            : null
                                                                          : null
                                                                        : null
                                                                      : null
                                                                    : null
                                                                  : null
                                                                : null
                                                              : null
                                                            : null
                                                          : null
                                                        : null
                                                      : null
                                                    : null
                                                  : null
                                                : null
                                              : null
                                            : null
                                          : null
                                        : null
                                      : null
                                    : null
                                  : null
                                : null
                              : null
                            : null
                          : null
                        : null
                      : null
                    : null
                  : null
                : null
              : null
            : null
          : null
        : null
      : null;
  });
};
