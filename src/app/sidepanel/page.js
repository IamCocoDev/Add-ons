"use client";

import { useEffect, useState } from "react";
import {
	meet,
	MeetSidePanelClient,
} from "@googleworkspace/meet-addons/meet.addons";
import { CLOUD_PROJECT_NUMBER, MAIN_STAGE_URL } from "@/constants";

export default function Page() {
	const [sidePanelClient, setSidePanelClient] = useState();

	// Launches the main stage when the main button is clicked.
	async function startActivity(e) {
		if (!sidePanelClient) {
			throw new Error("Side Panel is not yet initialized!");
		}
		await sidePanelClient.startActivity({
			mainStageUrl: MAIN_STAGE_URL,
		});
	}

	/**
	 * Prepares the add-on Side Panel Client.
	 */
	useEffect(() => {
		(async () => {
			const session = await meet.addon.createAddonSession({
				cloudProjectNumber: CLOUD_PROJECT_NUMBER,
			});
			setSidePanelClient(await session.createSidePanelClient());
		})();
	}, []);

	return (
		<>
			<div>This is the add-on Side Panel. Only you can see this.</div>
			<button onClick={startActivity}>Launch Activity in Main Stage.</button>
		</>
	);
}
