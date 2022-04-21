import axios from "axios";
import { useState } from "react";
import { API_URL } from "../Config";
import RSVPView from "../Views/RSVPView";

// Interfaces
export interface IRSVPInviteeData {
  guests: {
    id: number;
    first: string;
    last: string;
    intent: string;
    foodRestrictions: string;
  }[];
  comments: string;
  noChildrenUnderstood: boolean;
}

interface IGuestListData {
  GuestId: number;
  GuestInviteCode?: number;
  GuestFirstName: string;
  GuestLastName: string;
  GuestIntent: string;
  GuestFoodRestrictions: string;
  InviteCodeId?: number;
  InviteCode?: string;
  InviteGuestComments?: string;
  InviteViewedNotice?: boolean;
}

const DEBUG_INITIAL_DATA: IRSVPInviteeData = {
  guests: [
    {
      id: 0,
      first: "Jason",
      last: "Fraley",
      intent: "MAYBE",
      foodRestrictions: "None",
    },
  ],
  comments: "",
  noChildrenUnderstood: false,
};

// React Component
const RSVPController: React.FC = () => {
  const [inviteeData, setInviteeData] =
    useState<IRSVPInviteeData>(DEBUG_INITIAL_DATA);
  const [inviteCode, setInviteCode] = useState<string>();

  const formatInviteeData = (data: IGuestListData[]): IRSVPInviteeData => {
    var _guestList: IRSVPInviteeData = {
      guests: data.map((entry: IGuestListData) => {
        return {
          id: entry.GuestId,
          first: entry.GuestFirstName,
          last: entry.GuestLastName,
          intent: entry.GuestIntent,
          foodRestrictions: entry.GuestFoodRestrictions,
        };
      }),
      comments: data[0].InviteGuestComments || "",
      noChildrenUnderstood: data[0].InviteViewedNotice || false,
    };

    console.log(_guestList as IRSVPInviteeData);
    return _guestList as IRSVPInviteeData;
  };

  const exportInviteeData = (data: IRSVPInviteeData) => {
    var guests: IGuestListData[] = data.guests.map((guest, _idx) => {
      return {
        GuestId: guest.id,
        GuestFirstName: guest.first,
        GuestLastName: guest.last,
        GuestIntent: guest.intent,
        GuestFoodRestrictions: guest.foodRestrictions,
      };
    });
    // console.log(guests);
  };

  const getRSVPData = async (inviteCode: string) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .get(`${API_URL}/rsvp/get/${inviteCode}`)
        .then((response) => {
          console.log(response.data);
          // exportInviteeData(formatInviteeData(response.data));
          setInviteeData(formatInviteeData(response.data));
          setInviteCode(inviteCode);
          return resolve();
        })
        .catch(() => {
          return reject();
        });
    });
  };

  const handleSaveData = async (inviteeData: IRSVPInviteeData) => {
    return new Promise<void>((resolve, reject) => {
      inviteeData.guests.forEach((guest) => {
        axios
          .post(`${API_URL}/rsvp/update/${inviteCode}/${guest.id}`, guest)
          .then(() => resolve())
          .catch((response) => reject(response));
      });
    });
  };

  const handleUpdateNotice = async (inviteCode: string) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .post(`${API_URL}/rsvp/updateInvite/${inviteCode}/notice`)
        .then(() => resolve())
        .catch((response) => reject(response));
    });
  };

  const handleOnlineGuest = async (guest: {
    isAnonymous: boolean;
    firstName: string;
    lastName: string;
    bestWishes: string;
    displayPermitted: boolean;
  }) => {
    new Promise<void>((resolve, reject) => {
      axios
        .post(`${API_URL}/rsvp/online/new`, guest)
        .then(() => resolve())
        .catch((response) => reject(response));
    });
  };

  return (
    <RSVPView
      inviteeData={inviteeData}
      getRSVPData={getRSVPData}
      handleSaveData={handleSaveData}
      handleOnlineGuest={handleOnlineGuest}
      handleUpdateNotice={handleUpdateNotice}
    />
  );
};

export default RSVPController;
