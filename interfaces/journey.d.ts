export interface IJourney {
	id: number | string;
	car: any;
	duration?: string;
	start_point: any;
	end_point: any;
	is_instant_bookable: boolean;
	seats_available: number;
	start_date_time: Date;
	car: {
		owner: {
			id: number;
			first_name: string;
			last_name: string;
			photo: string;
		};
	};
}

export interface JourneyCardInformations {
  id: string;
  start_date_time: Date | string;
  duration: Date | string;
  start_point: StopPoint;
  end_point: StopPoint;
  is_instant_bookable: boolean;
  seats_available: number;
  car: CarInfos
}
export type createJourneyInput = {
departure?: string;
arrival?: string;
passengers?: number;
selectedTime?: Date | null;
selectedDate?: Date | null;
isInstantBookable?: boolean;
isSmoker?: boolean;
isTalkative?: boolean;
isMusicLover?: boolean;
carId?: number | string | undefined;
comment?: string
}

