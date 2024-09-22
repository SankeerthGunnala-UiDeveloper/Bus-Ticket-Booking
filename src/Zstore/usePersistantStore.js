import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useBusData = set => ({
    journeyDetails: {},
    setJourneyDetails: d => {
        set(s => {
            s.journeyDetails = d;
        });
    },
});

const PersistantStore = create(
    immer(
        persist(
            set => ({
                ...useBusData(set),
            }),
            {
                name: 'journey-details',
            }
        )
    )
);

export default PersistantStore;
