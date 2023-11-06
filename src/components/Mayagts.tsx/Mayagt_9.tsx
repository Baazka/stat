import React, { useState } from "react";
import {
  useNavigate,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Title from "../Title";
import "../../pages/Home.css";
import Comment from "../comment";
import FooterValue from "../Footervalue";
import dateFormat, { masks } from "dateformat";
import ButtonConfirm from "../ButtonConfirm";
import ButtonRequest from "../ButtonRequest";
import ButtonSearch from "../ButtonSearch";
import ButtonSave from "../SaveButton";
import { excel } from "../../assets/zurag";
import writeXlsxFile from "write-excel-file";
import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function Excel() {
  const objects = [
    {
      "odata.type": "SP.Data.EventsListItem",
      "odata.id": "c2a5b632-e1da-4010-8b22-14f304f6d4a9",
      "odata.etag": '"12"',
      "odata.editLink":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(30)",
      "AttachmentFiles@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(30)/AttachmentFiles",
      AttachmentFiles: [],
      "Theme@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(30)/Theme",
      Theme: [
        {
          "odata.type": "SP.Data.ThemeListItem",
          "odata.id": "39e8f0e1-1ede-4bec-bc7d-2785d5fc96c1",
          Id: 2,
          Title: "Banking & Finance",
        },
      ],
      "Audience@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(30)/Audience",
      Audience: [
        {
          "odata.type": "SP.Data.AudienceListItem",
          "odata.id": "a0e46247-3494-4944-9fd4-51f620f872ff",
          Id: 4,
          Title: "Talent",
        },
        {
          "odata.type": "SP.Data.AudienceListItem",
          "odata.id": "6986d67d-10fb-4522-b7f4-0dec0e60a528",
          Id: 3,
          Title: "Media",
        },
      ],
      "MCKAttendee@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(30)/MCKAttendee",
      MCKAttendee: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "9bf2e80f-7935-41ca-9098-bdc750ad2f5d",
          Id: 20,
          Title: "Johanna Lorenz",
        },
      ],
      "MCKSpeaker@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(30)/MCKSpeaker",
      MCKSpeaker: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "860284ea-952a-4ebc-b812-69f325c3002d",
          Id: 11,
          Title: "Alex Wilber",
        },
      ],
      "MCKOrganizer@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(30)/MCKOrganizer",
      MCKOrganizer: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "e87c25e1-86f0-4c0f-ad8e-bee6ca8d7eca",
          Id: 10,
          Title: "Adele Vance",
        },
      ],
      "MCKSource@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(30)/MCKSource",
      "Country@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(30)/Country",
      Country: {
        "odata.type": "SP.Data.CountriesListItem",
        "odata.id": "2bcaf885-20da-4230-b935-ed7c2303fbf1",
        Id: 2,
        Title: "Brazil",
      },
      Id: 30,
      ID: 30,
      Attachments: false,
      Status: "Declined",
      Name: "Reunião A",
      City: "São Paulo",
      Scope: "Local",
      Relevance: "Mid",
      Host: "Host",
      ParticipationType: ["Speaker"],
      Sponsorship: true,
      Summary: "Resumo",
      AgendaLink: null,
      Comments: "Comments",
      StartDate: "2022-06-28T13:30:20Z",
      EndDate: "2022-06-28T15:30:20Z",
      SponsorshipName: "Sponsorship Name",
      OrganizerContact: "Organizer Contact",
      VirtualOrVenue: ["Venue"],
      Venue: "Venue Name",
      OtherCountry: null,
      AllDay: false,
      SponsorshipFee: 10000,
      BackgroundColor: "#aabbcc",
    },
    {
      "odata.type": "SP.Data.EventsListItem",
      "odata.id": "863a653f-6405-46da-a5d1-19e5d36397b4",
      "odata.etag": '"39"',
      "odata.editLink":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(32)",
      "AttachmentFiles@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(32)/AttachmentFiles",
      AttachmentFiles: [
        {
          "odata.type": "SP.Attachment",
          "odata.id":
            "https://trinapsedev.sharepoint.com/sites/EventsToolforSL/_api/Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(32)/AttachmentFiles('a.png')",
          "odata.editLink":
            "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(32)/AttachmentFiles('a.png')",
          FileName: "a.png",
          FileNameAsPath: {
            DecodedUrl: "a.png",
          },
          ServerRelativePath: {
            DecodedUrl:
              "/sites/EventsToolforSL/Lists/Events/Attachments/32/a.png",
          },
          ServerRelativeUrl:
            "/sites/EventsToolforSL/Lists/Events/Attachments/32/a.png",
        },
      ],
      "Theme@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(32)/Theme",
      Theme: [
        {
          "odata.type": "SP.Data.ThemeListItem",
          "odata.id": "b7be931a-6ac9-4412-8b85-9046cf27be4b",
          Id: 13,
          Title: "TMT",
        },
        {
          "odata.type": "SP.Data.ThemeListItem",
          "odata.id": "fc9bc800-7659-4ee1-95ca-97b49c63fb87",
          Id: 14,
          Title: "TLI",
        },
      ],
      "Audience@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(32)/Audience",
      Audience: [
        {
          "odata.type": "SP.Data.AudienceListItem",
          "odata.id": "a310e8d8-dc31-495a-89b2-b74757c866a5",
          Id: 1,
          Title: "SBL",
        },
        {
          "odata.type": "SP.Data.AudienceListItem",
          "odata.id": "44c9df6d-f9c1-42df-b07f-07adca4fbb9e",
          Id: 2,
          Title: "GO",
        },
      ],
      "MCKAttendee@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(32)/MCKAttendee",
      MCKAttendee: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "0eb94d98-edc1-49c1-8f11-c8f15b0c435c",
          Id: 18,
          Title: "Nestor Wilke",
        },
      ],
      "MCKSpeaker@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(32)/MCKSpeaker",
      MCKSpeaker: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "728b56ac-da0d-43a7-9071-fdc134169e67",
          Id: 10,
          Title: "Adele Vance",
        },
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "c4261f70-22e9-4654-a959-af37d307c607",
          Id: 11,
          Title: "Alex Wilber",
        },
      ],
      "MCKOrganizer@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(32)/MCKOrganizer",
      MCKOrganizer: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "8694a0c4-e670-4b1a-b5f5-d884285aa665",
          Id: 20,
          Title: "Johanna Lorenz",
        },
      ],
      "MCKSource@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(32)/MCKSource",
      MCKSource: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "bf910f82-c11a-45dd-aebb-e70478b0f041",
          Id: 6,
          Title: "Trinapse Software",
        },
      ],
      "Country@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(32)/Country",
      Country: {
        "odata.type": "SP.Data.CountriesListItem",
        "odata.id": "08e0e485-d2f4-458c-aeb8-2fb45b124af6",
        Id: 2,
        Title: "Brazil",
      },
      Id: 32,
      ID: 32,
      Attachments: true,
      Status: "Declined",
      Name: "Evento D",
      City: "City2",
      Scope: "Regional",
      Relevance: "Mid",
      Host: "Host2",
      ParticipationType: ["Speaker"],
      Sponsorship: true,
      Summary: "Summary\n",
      AgendaLink: null,
      Comments: null,
      StartDate: "2022-07-19T12:00:00Z",
      EndDate: "2022-07-19T15:00:00Z",
      SponsorshipName: "Sponsorship Name",
      OrganizerContact: "Organizer Contact",
      VirtualOrVenue: ["Virtual", "Venue"],
      Venue: "Venue Name",
      OtherCountry: null,
      AllDay: true,
      SponsorshipFee: 10000,
    },
    {
      "odata.type": "SP.Data.EventsListItem",
      "odata.id": "7686176f-cba1-4538-8a93-ae12ee25b2ce",
      "odata.etag": '"7"',
      "odata.editLink":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(33)",
      "AttachmentFiles@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(33)/AttachmentFiles",
      AttachmentFiles: [],
      "Theme@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(33)/Theme",
      Theme: [
        {
          "odata.type": "SP.Data.ThemeListItem",
          "odata.id": "b7531421-36ce-4a10-a9ed-fe538384330b",
          Id: 13,
          Title: "TMT",
        },
        {
          "odata.type": "SP.Data.ThemeListItem",
          "odata.id": "c407ae3e-4b66-44b2-b3be-0c16616d8169",
          Id: 12,
          Title: "Sustainability",
        },
      ],
      "Audience@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(33)/Audience",
      Audience: [
        {
          "odata.type": "SP.Data.AudienceListItem",
          "odata.id": "d0c751ea-06e5-4578-948a-8bdc53c5256c",
          Id: 1,
          Title: "SBL",
        },
      ],
      "MCKAttendee@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(33)/MCKAttendee",
      MCKAttendee: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "802b7e7f-fcbe-4612-b706-4239ca5f6f15",
          Id: 10,
          Title: "Adele Vance",
        },
      ],
      "MCKSpeaker@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(33)/MCKSpeaker",
      MCKSpeaker: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "b4408c88-3fb2-498d-8884-b755ef0a36d5",
          Id: 11,
          Title: "Alex Wilber",
        },
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "5ce8b2d4-f9a7-41e4-afc1-a4307797f7e4",
          Id: 18,
          Title: "Nestor Wilke",
        },
      ],
      "MCKOrganizer@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(33)/MCKOrganizer",
      MCKOrganizer: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "9c567ed2-2ebf-4c74-9422-ec0b6dd9a765",
          Id: 20,
          Title: "Johanna Lorenz",
        },
      ],
      "MCKSource@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(33)/MCKSource",
      MCKSource: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "5324b98a-3c23-4702-9845-d57e88215ed2",
          Id: 6,
          Title: "Trinapse Software",
        },
      ],
      "Country@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(33)/Country",
      Country: {
        "odata.type": "SP.Data.CountriesListItem",
        "odata.id": "cdf52d63-e4dc-4ff4-8245-f07fe1955c2a",
        Id: 1,
        Title: "Argentina",
      },
      Id: 33,
      ID: 33,
      Attachments: false,
      Status: "Declined",
      Name: "Evento E",
      City: "São Paulo",
      Scope: "Local",
      Relevance: "High",
      Host: "Host",
      ParticipationType: ["Attendee", "Speaker"],
      Sponsorship: true,
      Summary: "Summary",
      AgendaLink: null,
      Comments: null,
      StartDate: "2022-07-28T01:00:00Z",
      EndDate: "2022-07-28T02:59:00Z",
      SponsorshipName: "Sponsorship Name",
      OrganizerContact: "Organizer Contact",
      VirtualOrVenue: ["Virtual", "Venue"],
      Venue: "Venue Name",
      OtherCountry: null,
      AllDay: true,
      SponsorshipFee: 10000,
    },
    {
      "odata.type": "SP.Data.EventsListItem",
      "odata.id": "ce2d2d59-977d-4545-8322-dc15f73980b6",
      "odata.etag": '"15"',
      "odata.editLink":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(34)",
      "AttachmentFiles@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(34)/AttachmentFiles",
      AttachmentFiles: [],
      "Theme@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(34)/Theme",
      Theme: [
        {
          "odata.type": "SP.Data.ThemeListItem",
          "odata.id": "b31f6155-c380-4fab-942c-c4e483a0a66a",
          Id: 14,
          Title: "TLI",
        },
      ],
      "Audience@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(34)/Audience",
      Audience: [
        {
          "odata.type": "SP.Data.AudienceListItem",
          "odata.id": "3c3402e0-8d91-4e86-995a-6aa8b87ce1ce",
          Id: 2,
          Title: "GO",
        },
      ],
      "MCKAttendee@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(34)/MCKAttendee",
      MCKAttendee: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "936656f7-8265-4a2f-8fb2-9dc083e7f839",
          Id: 10,
          Title: "Adele Vance",
        },
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "c3787721-7c4c-45c4-8ef5-3f711e1a9817",
          Id: 20,
          Title: "Johanna Lorenz",
        },
      ],
      "MCKSpeaker@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(34)/MCKSpeaker",
      MCKSpeaker: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "42e51788-9588-4f7c-9599-046e228386f3",
          Id: 11,
          Title: "Alex Wilber",
        },
      ],
      "MCKOrganizer@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(34)/MCKOrganizer",
      MCKOrganizer: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "2ffded11-125c-4aa5-990c-d1c03ccaf906",
          Id: 18,
          Title: "Nestor Wilke",
        },
      ],
      "MCKSource@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(34)/MCKSource",
      MCKSource: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "f238713b-c5a5-4b75-830b-e38625b65e19",
          Id: 12,
          Title: "Grady Archie",
        },
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "cfe10691-0afa-4660-8aed-e93c07635e56",
          Id: 6,
          Title: "Trinapse Software",
        },
      ],
      "Country@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(34)/Country",
      Id: 34,
      ID: 34,
      Attachments: false,
      Status: "Confirmed",
      Name: "Evento B",
      City: "Montevideu",
      Scope: "Regional",
      Relevance: "Mid",
      Host: "Erick Alves",
      ParticipationType: ["Attendee"],
      Sponsorship: true,
      Summary: "Teste",
      AgendaLink: "https://www.google.com/",
      Comments: null,
      StartDate: "2022-07-04T14:04:15Z",
      EndDate: "2022-07-04T14:04:15Z",
      SponsorshipName: "Name",
      OrganizerContact: null,
      VirtualOrVenue: ["Venue"],
      Venue: "123",
      OtherCountry: "Bolivia",
      AllDay: false,
      SponsorshipFee: 1500,
    },
    {
      "odata.type": "SP.Data.EventsListItem",
      "odata.id": "69a6fcaf-3134-4ec5-90e8-f59c4d8cca8d",
      "odata.etag": '"4"',
      "odata.editLink":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(35)",
      "AttachmentFiles@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(35)/AttachmentFiles",
      AttachmentFiles: [],
      "Theme@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(35)/Theme",
      Theme: [
        {
          "odata.type": "SP.Data.ThemeListItem",
          "odata.id": "3870c2bd-8da9-41c1-9aae-a963e99c0f4c",
          Id: 6,
          Title: "GM&S",
        },
      ],
      "Audience@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(35)/Audience",
      Audience: [
        {
          "odata.type": "SP.Data.AudienceListItem",
          "odata.id": "53be87a7-e0fd-4485-9f61-3aec76ffec8e",
          Id: 1,
          Title: "SBL",
        },
      ],
      "MCKAttendee@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(35)/MCKAttendee",
      MCKAttendee: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "0fd0ba6a-8687-42ba-b84a-bce63dbc1404",
          Id: 11,
          Title: "Alex Wilber",
        },
      ],
      "MCKSpeaker@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(35)/MCKSpeaker",
      MCKSpeaker: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "aa4dfcf0-9081-4b2f-bcb6-0f9a21dca1c4",
          Id: 18,
          Title: "Nestor Wilke",
        },
      ],
      "MCKOrganizer@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(35)/MCKOrganizer",
      MCKOrganizer: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "74182559-0b9c-4b20-9f74-2d2ffca74860",
          Id: 10,
          Title: "Adele Vance",
        },
      ],
      "MCKSource@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(35)/MCKSource",
      MCKSource: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "a2c8fdce-14d1-40f6-8413-2d7d780f87cc",
          Id: 11,
          Title: "Alex Wilber",
        },
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "6e6abf4e-1b8b-4eec-817b-891727d163d0",
          Id: 20,
          Title: "Johanna Lorenz",
        },
      ],
      "Country@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(35)/Country",
      Country: {
        "odata.type": "SP.Data.CountriesListItem",
        "odata.id": "ba7d20b3-f84c-4f56-9a1a-85be234a935d",
        Id: 3,
        Title: "Chile",
      },
      Id: 35,
      ID: 35,
      Attachments: false,
      Status: "Confirmed",
      Name: "Evento C - All day",
      City: "Santiago",
      Scope: "Regional",
      Relevance: "Mid",
      Host: "Erick Alves",
      ParticipationType: ["Organizer"],
      Sponsorship: false,
      Summary: "Lorem ipsum",
      AgendaLink: "https://www.google.com/",
      Comments: null,
      StartDate: "2022-07-06T03:00:00Z",
      EndDate: "2022-07-07T02:59:59Z",
      SponsorshipName: null,
      OrganizerContact: null,
      VirtualOrVenue: ["Venue"],
      Venue: "123",
      OtherCountry: null,
      AllDay: true,
      SponsorshipFee: null,
      backgroundColor: "#1E90FF",
    },
    {
      "odata.type": "SP.Data.EventsListItem",
      "odata.id": "c5893258-5e28-47d6-84db-2479ef082281",
      "odata.etag": '"2"',
      "odata.editLink":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(36)",
      "AttachmentFiles@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(36)/AttachmentFiles",
      AttachmentFiles: [],
      "Theme@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(36)/Theme",
      Theme: [
        {
          "odata.type": "SP.Data.ThemeListItem",
          "odata.id": "7df64df2-4643-4949-a155-f2ca8fb5d7d3",
          Id: 14,
          Title: "TLI",
        },
        {
          "odata.type": "SP.Data.ThemeListItem",
          "odata.id": "a832de4e-9dd4-4885-93e2-2d9fc962e3d2",
          Id: 12,
          Title: "Sustainability",
        },
      ],
      "Audience@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(36)/Audience",
      Audience: [
        {
          "odata.type": "SP.Data.AudienceListItem",
          "odata.id": "1c1b11b8-b388-483c-9d06-c4bc427dcfbf",
          Id: 2,
          Title: "GO",
        },
      ],
      "MCKAttendee@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(36)/MCKAttendee",
      MCKAttendee: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "2e4e0205-b494-4396-947c-8b865b498e2d",
          Id: 10,
          Title: "Adele Vance",
        },
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "b8c108cc-78df-4edc-91cf-7e284565d9bc",
          Id: 20,
          Title: "Johanna Lorenz",
        },
      ],
      "MCKSpeaker@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(36)/MCKSpeaker",
      MCKSpeaker: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "84f61c53-b7b4-46a4-bc6b-3389c59aa088",
          Id: 11,
          Title: "Alex Wilber",
        },
      ],
      "MCKOrganizer@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(36)/MCKOrganizer",
      MCKOrganizer: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "0d4eaef0-9def-4cd2-a348-80a8942a4a22",
          Id: 18,
          Title: "Nestor Wilke",
        },
      ],
      "MCKSource@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(36)/MCKSource",
      "Country@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(36)/Country",
      Country: {
        "odata.type": "SP.Data.CountriesListItem",
        "odata.id": "d1de00d2-36fd-4565-8fcc-43653e51189c",
        Id: 2,
        Title: "Brazil",
      },
      Id: 36,
      ID: 36,
      Attachments: false,
      Status: "Pending",
      Name: "Event F",
      City: "São Paulo",
      Scope: "Regional",
      Relevance: "High",
      Host: "Erick Alves",
      ParticipationType: ["Attendee"],
      Sponsorship: true,
      Summary: "Test",
      AgendaLink: "https://mybuild.microsoft.com/en-US/home",
      Comments: null,
      StartDate: "2022-07-13T13:00:31Z",
      EndDate: "2022-07-13T20:00:31Z",
      SponsorshipName: "Sponsor test",
      OrganizerContact: null,
      VirtualOrVenue: ["Virtual", "Venue"],
      Venue: "Venue test",
      OtherCountry: null,
      AllDay: false,
      SponsorshipFee: 15690,
    },
    {
      "odata.type": "SP.Data.EventsListItem",
      "odata.id": "9add913a-afe5-416e-92dd-a328435a2f2a",
      "odata.etag": '"2"',
      "odata.editLink":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(37)",
      "AttachmentFiles@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(37)/AttachmentFiles",
      AttachmentFiles: [],
      "Theme@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(37)/Theme",
      Theme: [
        {
          "odata.type": "SP.Data.ThemeListItem",
          "odata.id": "bef92976-47ce-4555-b717-0d2668a84255",
          Id: 7,
          Title: "MT",
          backgroundColor: "#aabbcc",
        },
        {
          "odata.type": "SP.Data.ThemeListItem",
          "odata.id": "ec729045-67c4-4489-acda-8906c8092b14",
          Id: 9,
          Title: "Ops",
        },
      ],
      "Audience@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(37)/Audience",
      Audience: [
        {
          "odata.type": "SP.Data.AudienceListItem",
          "odata.id": "7a307c93-9de9-4dae-a97a-957782579d59",
          Id: 2,
          Title: "GO",
        },
        {
          "odata.type": "SP.Data.AudienceListItem",
          "odata.id": "edd1fb6f-876b-466d-b4e8-742d4d9be935",
          Id: 3,
          Title: "Media",
        },
      ],
      "MCKAttendee@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(37)/MCKAttendee",
      MCKAttendee: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "1c721d89-16cb-4c1d-a1af-2f5cb06d2ada",
          Id: 10,
          Title: "Adele Vance",
        },
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "f5c2a355-8e36-4955-8a8d-e2cfdf3e1148",
          Id: 20,
          Title: "Johanna Lorenz",
        },
      ],
      "MCKSpeaker@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(37)/MCKSpeaker",
      MCKSpeaker: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "f9ea81a1-4328-422b-ab37-9cbeeedc76b5",
          Id: 18,
          Title: "Nestor Wilke",
        },
      ],
      "MCKOrganizer@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(37)/MCKOrganizer",
      MCKOrganizer: [
        {
          "odata.type": "SP.Data.UserInfoItem",
          "odata.id": "94ac479f-8da3-49e2-ad6c-e8f8ee1f7eea",
          Id: 11,
          Title: "Alex Wilber",
        },
      ],
      "MCKSource@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(37)/MCKSource",
      "Country@odata.navigationLinkUrl":
        "Web/Lists(guid'0592fc49-7b81-4775-9f3b-ed60ad4bca69')/Items(37)/Country",
      Id: 37,
      ID: 37,
      Attachments: false,
      Status: "Pending",
      Name: "Event G",
      City: "Berlin",
      Scope: "Regional",
      Relevance: "Mid",
      Host: "Erick Alves",
      ParticipationType: ["Attendee"],
      Sponsorship: true,
      Summary: "Test",
      AgendaLink: "https://mybuild.microsoft.com/en-US/home",
      Comments: null,
      StartDate: "2022-07-04T20:11:21Z",
      EndDate: "2022-07-04T20:11:21Z",
      SponsorshipName: "Sponsor",
      OrganizerContact: null,
      VirtualOrVenue: ["Virtual", "Venue"],
      Venue: "Venue test",
      OtherCountry: "Germany",
      AllDay: true,
      SponsorshipFee: 1500,
    },
  ];

  const schema = [
    {
      column: "№",
      Sticky: true,
      type: Number,
      width: 5,
      value: (student: any) => student.N,
    },
    {
      column: "Аудитын он",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Status,
    },
    {
      column: "Аудитын төрөл",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Аудитын нэр, сэдэв",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Аудитын код",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Хүргүүлсэн огноо",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Биелэлтийг тооцох огноо",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Тухайн үр дүнг алдаа зөрчилд тооцох эсэх",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Зөрчлийн товч утга",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Шийдвэрлэлтийн дүн (төгрөг)",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Гаргасан шийдэл",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Шалгагдагч байгууллагын нэр",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Регистрийн дугаар",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Төсөв захирагчийн ангилал",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Зөрчил гаргасан албан тушаалтны овог, нэр",
      wrap: true,
      width: 35,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Зөрчил гаргасан хүний албан тушаал",
      wrap: true,
      width: 35,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Хэрэгжсэн биелэлтийн дүн (төгрөг)",
      wrap: true,
      width: 35,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Хэрэгжээгүй биелэлтийн дүн  (төгрөг)",
      wrap: true,
      width: 35,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Хэрэгжээгүй тайлбар (шалтгаан, нөхцөл)",
      wrap: true,
      width: 35,
      type: String,
      value: (student: any) => student.Name,
    },

    //   {
    //     column: 'Name',
    //     type: String,
    //     value: student => student.Name
    //   },
    //   {
    //     column: 'Cost',
    //     type: Number,
    //     format: '#,##0.00',
    //     value: student => student.cost
    //   },
    //   {
    //     column: 'Paid',
    //     type: Boolean,
    //     value: student => student.paid
    //   }
  ];

  const exportar = () => {
    console.log("exportar");

    writeXlsxFile(objects, {
      schema,
      headerStyle: {
        backgroundColor: "#aabbcc",
        fontWeight: "bold",
        fontSize: 13,
        align: "center",
        alignVertical: "top",
        wrap: true,
      },
      fileName: "З-ТАББМ-9",
    });
  };
  return (
    <div className="s">
      <button
        onClick={exportar}
        className="inline-flex items-center rounded ml-2 py-1 h-7"
        style={{
          border: "1px solid #3cb371",
        }}
      >
        <div className="bg-white">
          <img src={excel} width="20px" height="20px" className="mx-1"></img>
        </div>
        <div
          style={{
            backgroundColor: "#3cb371",
          }}
          className=" text-white rounded-r px-1 h-7"
        >
          Excel
        </div>
      </button>
    </div>
  );
}

type Stat_m9 = {
  AUDIT_ON: string;
  AUDIT_TOROL: string;
  AUDIT_NER_SDEV: string;
  AUDIT_KOD: number;
  HURGUULSEN_OGNOO: string;
  BIELELTIIG_TOOTSOH_OGNOO: string;
  TUHAIN_UR_DUN_AZT_ESEH: string;
  ZORCHIL_TOWCH_UTGA: string;
  SHIDWERLLTIIN_DUN_TOG: number;
  GARGASAN_SHIIDEL: string;
  BAIGUULLGIIN_TOROL: string;
  REGISTER: number;
  TOSOW_ZAHIRGCH_ANGILAL: string;
  ZORCHIL_GARGSN_ALBAN_TUSHAAL_OVOG_NR: string;
  ZORCHIL_GARGSN_HUNII_ALBAN_TUSHAAL: string;
  HEREGJSEN_BIELLTIIN_DUN_TOGROG: number;
  HEREGJEEGUI_BIELLTIIN_DUN_TOG: number;
  HEREGJEEGUI_TAILBAR_SHALTGN_NOHTSOL: string;
};

function Mayagt_9() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Stat_m9, any>[]>(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "№",
        filterable: true,
      },
      {
        accessorKey: "AUDIT_ON",
        cell: (info) => info.getValue(),
        header: "Аудит он",
        footer: (props) => props.column.id,
      },

      {
        accessorKey: "AUDIT_TOROL",
        header: "Аудитын төрөл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_NER_SDEV",
        header: "Аудитын нэр сэдэв",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_KOD",
        header: "Аудитын код",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "HURGUULSEN_OGNOO",
        header: "Хүргүүлсэн огноо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BIELELTIIG_TOOTSOH_OGNOO",
        header: "Биелэлтийг тооцох огноо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TUHAIN_UR_DUN_AZT_ESEH",
        header: "Тухайн үр дүнг алдаа зөрчилд тооцох эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ZORCHIL_TOWCH_UTGA",
        header: "Зөрчлийн товч утга",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SHIDWERLLTIIN_DUN_TOG",
        header: "Шийдвэрлэлтийн дүн (төгрөг)",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "GARGASAN_SHIIDEL",
        header: "Гаргасан шийдэл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BAIGUULLGIIN_TOROL",
        header: "Шалгагдагч байгууллагын нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "REGISTER",
        header: "Регистрийн дугаар",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOSOW_ZAHIRGCH_ANGILL",
        header: "Төсөв захирагчийн ангилал",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ZORCHIL_GARGSN_ALBAN_TUSHAAL_OVOG_NR",
        header: "Зөрчил гаргасан албан тушаалтны овог, нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ZORCHIL_GARGSN_HUNII_ALBAN_TUSHAAL",
        header: "Зөрчил гаргасан хүний албан тушаал",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "HEREGJSEN_BIELLTIIN_DUN_TOGROG",
        header: "Хэрэгжсэн биелэлтийн дүн (төгрөг)",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "HEREGJEEGUI_BIELLTIIN_DUN_TOG",
        header: "Хэрэгжээгүй биелэлтийн дүн (төгрөг)",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "HEREGJEEGUI_TAILBAR_SHALTGN_NOHTSOL",
        header: "Хэрэгжээгүй тайлбар (шалтгаан, нөхцөл)",

        cell: (info) => info.getValue(),
      },
    ],
    []
  );
  let Stat_m9 = [{}];
  const [data, setData] = React.useState<Stat_m9[]>(Stat_m9);
  const Navigate = useNavigate();
  const refreshData = () => setData((old) => []);
  const [filter, setFilter] = useState({
    Audit: {
      PERIOD_ID: 4,
      DEPARTMENT_ID: 999,
      BUDGET_TYPE_ID: 999,
      PARENT_BUDGET_ID: 999,
      TYPE: 0,
    },
  });

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  // function Draw_input(param: any, cell: any, index: number) {
  //   return (
  //     <div>
  //       {cell.id === "AUDIT_TOROL" ? (
  //         <select
  //           className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Санхүүгийн тайлангийн аудит"}
  //             value={1}
  //           >
  //             {"Санхүүгийн тайлангийн аудит"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Гүйцэтгэлийн аудит"}
  //             value={2}
  //           >
  //             {"Гүйцэтгэлийн аудит"}
  //           </option>
  //           <option className="font-medium" key={"Нийцлийн аудит"} value={3}>
  //             {"Нийцлийн аудит"}
  //           </option>
  //         </select>
  //       ) : cell.id === "TUHAIN_UR_DUN_AZT_ESEH" ? (
  //         <select
  //           className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option className="font-medium" key={"Үгүй"} value={1}>
  //             {"Үгүй"}
  //           </option>
  //           <option className="font-medium" key={"Алдаа"} value={2}>
  //             {"Алдаа"}
  //           </option>
  //           <option className="font-medium" key={"Зөрчил"} value={3}>
  //             {"Зөрчил"}
  //           </option>
  //         </select>
  //       ) : cell.id === "GARGASAN_SHIIDEL" ? (
  //         <select
  //           className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option className="font-medium" key={"1. Зөвлөмж"} value={1}>
  //             {"1. Зөвлөмж"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"2. Албан шаардлага"}
  //             value={2}
  //           >
  //             {"2. Албан шаардлага"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"3. Сахилга шийтгэл ногдуулах албан шаардлага"}
  //             value={3}
  //           >
  //             {"3. Сахилга шийтгэл ногдуулах албан шаардлага"}
  //           </option>
  //           <option className="font-medium" key={"4. Төлбөрийн акт"} value={4}>
  //             {"4. Төлбөрийн акт"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"5. Хууль хяналтын байгууллагад шилжүүлсэн асуудал"}
  //             value={5}
  //           >
  //             {"5. Хууль хяналтын байгууллагад шилжүүлсэн асуудал"}
  //           </option>
  //         </select>
  //       ) : cell.id === "TOSOW_ZAHIRGCH_ANGILL" ? (
  //         <select
  //           className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option className="font-medium" key={"ТЕЗ"} value={1}>
  //             {"ТЕЗ"}
  //           </option>
  //           <option className="font-medium" key={"ТТЗ"} value={2}>
  //             {"ТТЗ"}
  //           </option>
  //           <option className="font-medium" key={"ТШЗ"} value={3}>
  //             {"ТШЗ"}
  //           </option>
  //           <option className="font-medium" key={"Төсөл, хөтөлбөр"} value={4}>
  //             {"Төсөл, хөтөлбөр"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Засгийн газрын тусгай сан"}
  //             value={5}
  //           >
  //             {"Засгийн газрын тусгай сан"}
  //           </option>
  //           <option className="font-medium" key={"ТБОНӨҮГ"} value={6}>
  //             {"ТБОНӨҮГ"}
  //           </option>
  //         </select>
  //       ) : cell.id === "AUDIT_ON" ||
  //         cell.id === "HURGUULSEN_OGNOO" ||
  //         cell.id === "BIELELTIIG_TOOTSOH_OGNOO" ? (
  //         <input
  //           type="date"
  //           className="border-gray-400 rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2 font-normal"
  //           value={dateFormat(param.row.original[cell.id], "yyyy-mm-dd")}
  //           onChange={(e) => {
  //             let temp = data;
  //             //@ts-ignore
  //             temp[index][cell.id] = dateFormat(e.target.value, "yyyy-mm-dd");
  //             // @ts-ignore
  //             setData([...temp]);
  //           }}
  //         />
  //       ) : cell.id === "" ? (
  //         <textarea
  //           value={param.row.original[cell.id]}
  //           className={
  //             index % 2 > 0
  //               ? "flex text-center h-8 bg-gray-100"
  //               : "flex text-center h-8"
  //           }
  //           style={{
  //             minHeight: "33px",
  //             border: "1px solid",
  //             borderRadius: "4px",
  //             color: "gray",
  //           }}
  //           onChange={(e) => {
  //             let temp = data;
  //             //@ts-ignore
  //             temp[index][cell.id] = e.target.value;
  //             // @ts-ignore
  //             setData([...temp]);
  //           }}
  //         />
  //       ) : null}
  //     </div>
  //   );
  // }

  // React.useEffect(() => {
  //   if (table.getState().columnFilters[0]?.id === "fullName") {
  //     if (table.getState().sorting[0]?.id !== "fullName") {
  //       table.setSorting([{ id: "fullName", desc: false }]);
  //     }
  //   }
  // }, [table.getState().columnFilters[0]?.id]);

  return (
    <>
      <div
        style={{
          maxHeight: window.innerHeight - 129,
          maxWidth: window.innerWidth,
          padding: "0.5rem 0 0 1rem",
        }}
      >
        <Title
          TITLE={
            "ТӨРИЙН АЛБАН ТУШААЛТНЫ ТӨРД УЧРУУЛСАН ХОХИРЛЫГ ТӨЛҮҮЛЭХ ҮҮРГИЙН ХЭРЭГЖИЛТИЙН БҮРТГЭЛ З-ТАББМ-9"
          }
          widthS={"51rem"}
          widthL={"22rem"}
        />
        <div className="flex justify-between mb-2 ">
          <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
            <ButtonSearch />
            <Excel />
          </div>
          <div className="flex">
            <ButtonRequest />
            <ButtonConfirm />
          </div>
        </div>
        <div style={{ maxHeight: "630px", overflowY: "scroll" }}>
          <div className="h-2 mr-20" />
          <table>
            <thead className="TableHeadBackroundcolor gap-20">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: 250 }}
                      >
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                            ></div>
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter column={header.column} table={table} />
                              </div>
                            ) : null}
                          </>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, i) => {
                return (
                  <tr
                    key={row.id}
                    className={i % 2 > 0 ? "tr bg-gray-100" : "tr"}
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      return (
                        <td key={cell.id} className="p-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <ButtonSave />
        </div>
        <div style={{ justifyContent: "flex-end" }}>
          <div className="justify-end flex items-center gap-1 mt-5 mr-2">
            <button
              className="border p-0.8 color bg-blue-300 rounded-md w-6 text-white"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border p-0.8 color bg-blue-300 rounded-md w-6 text-white"
            >
              {"<"}
            </button>
            <button
              className="border p-0.8 color bg-blue-300 rounded-md w-6 text-white"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border p-0.8 color bg-blue-300 rounded-md w-6 text-white"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-4">
              <div>нийт</div>
              <strong>
                {table.getState().pagination.pageIndex + 1}{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="border p-0.8 bg-blue-300 rounded-lg text-white ml-2"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="text-base flex row">
            <FooterValue />
          </div>
        </div>

        <div className="flex flex-col p-5 pl-0" style={{ width: "100%" }}>
          <div className="flex  items-end">
            <Comment />
          </div>
        </div>
      </div>
    </>
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>

      <div className="h-4" />
    </>
  );
}
export default Mayagt_9;
