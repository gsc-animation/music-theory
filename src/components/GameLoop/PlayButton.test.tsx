import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PlayButton } from './PlayButton';
import { lookaheadScheduler } from '../../services/LookaheadScheduler';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import React from 'react';

// Mock the scheduler singleton
vi.mock('../../services/LookaheadScheduler', () => ({
    lookaheadScheduler: {
        start: vi.fn(),
        stop: vi.fn(),
        running: false
    }
}));

describe('PlayButton', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders start button initially', () => {
        render(<PlayButton />);
        expect(screen.getByText('Start Loop')).toBeInTheDocument();
    });

    it('toggles playback on click', async () => {
        render(<PlayButton onTick={vi.fn()} />);

        const button = screen.getByRole('button');

        // Click to Start
        fireEvent.click(button);
        await waitFor(() => {
             expect(lookaheadScheduler.start).toHaveBeenCalled();
        });

        expect(screen.getByText('Stop')).toBeInTheDocument();

        // Click to Stop
        fireEvent.click(button);
        expect(lookaheadScheduler.stop).toHaveBeenCalled();
        expect(screen.getByText('Start Loop')).toBeInTheDocument();
    });
});
