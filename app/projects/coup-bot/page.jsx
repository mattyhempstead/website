import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectImage from '@/components/projects/ProjectImage';

export const metadata = getProjectMetadata("coup-bot");

export default function Project() {
    return <ProjectPage projectId="coup-bot">
        <p>
            <a
                href="https://en.wikipedia.org/wiki/Coup_(card_game)"
            >Coup</a> is a relatively well known social deduction card game where players must attempt
            to eliminate the other players by lying and call bluffs until one player remains.
        </p>

        <p>
            The lying aspect makes it hard for humans, but even harder for computers to play as you can't
            simply brute force search all possible future game states as a chess engine might.
        </p>

        <br/>

        <p>
            In 2022, SYNCS (the USyd CS society) worked with <a href="https://sig.com/">SIG</a> to host a bot battle
            competition for Coup.

            I teamed up with <a href="https://github.com/thewrongjames">James</a> to participate in the bot
            battle (and we won 🎉).
        </p>

        <ProjectImage
            imageUrl="/projects/coup-bot/leaderboard.png"
            imageAlt="Final Leaderboard"
            caption={<>
                This screenshot of the final leaderboard shows the win-rate of the top 3 performing teams.
                <br/>
                Our bot "Alpha Coup" won 70% of games, each a battle between 5 different teams.
            </>}
        />


        <h2>
            Overview of Strategy
        </h2>

        <p>
            The development of our strategy was split into two distinct parts that were designed to be
            non-overlapping, but heavily dependent on each other.
        </p>

        <p>
            Firstly, James built an engine of the entire Coup game that allowed us to simulate games between
            bots locally.
        </p>

        <p>
            It was then my job to use the Coup engine to develop and compare a number of strategies by implementing
            a generic Bot interface that James has exposed.
        </p>

        <p>
            For a detailed explanation of the strategy, check out our <a
                href="https://github.com/mattyhempstead/syncs-coup-bot"
            >GitHub repo</a> (which also contains the source code).
        </p>


        <h2>Bot Science</h2>

        <h3>
            Creating a bot is more than software
        </h3>

        <p>
            Having participated in a few bot battles now, I find them to be quite a different beast compared
            to regular software development.
        </p> 

        <p> 
            Typically, when working at a company, there are a list of features that mysteriously end up on your
            lap and it is your job to implement them.

            Implementation tradeoffs need to be considered, but many hard decisions have typically already been made by the
            time you hear about it.
        </p>

        <p>
            At somewhere like a hackathon, you additionally need to be part of the team that decides which features to implement.
            A typical strategy is to plan and execute an MVP, with a list of stretch goals to be attempted during any remaining time.

            {/* This is common at a hackathon, where not only do you need to implement features, but you also need to
            plan which features are worth developing given the various tradeoffs like development time and complexity. */}
        </p>

        <p>
            When building a competitive bot however, not only do you need to decide which features to make and how, but
            you also have no idea what features will actually work until <i>after</i> they are developed.

            Also, testing a feature in the real world will expose it to your competition, at which point copying you
            becomes fair game.
        </p>

        <p> 
            If you could figure out which strategy was best from just thinking, you would just spend an hour writing up the
            code and submit it right near the end. Unfortunately, this is never the case.
        </p>


        <h3>
            Evaluation-driven development
        </h3>

        <p>
            Given these extra complexities, evaluation speed and accuracy should become a priority.
        </p>

        <p>
            If the bot battle does not provide a local environment to test your bots, one of the best
            ways to achieve fast evaluation is to write a simulation of the game environment that
            will allow you to compare bots locally.
            While a simulation provides you with a huge evaluation speed advantage (often 100x),
            accuracy is sacrificed in the process.
        </p>

        <p>
            For this reason, the first step after a building local simulation should be to develop a number
            of feasible simulated competitors that your testing framework can randomly sample from.
            You should aim to think of strategies that are likely to be common among your competitors,
            such that any bot which defeats them is likely to defeat the real competition.
            Overfitting is always a concern here.
            
        </p>

        <p>
            After this, your goal is now to do science.
        </p>

        <ul className='mt-1'>
            <li>
                Develop hypotheses (theories about which strategies would beat others)
            </li>
            <li>
                Build experiments (write the bot)
            </li>
            <li>
                Measure results (evaluate the bot using the simulation)
            </li>
            <li>
                Repeat with your new learnings.
            </li>
        </ul>

        <p>
            Many hypotheses will produce null results, but occasionally you will gain a percent of
            win-rate. Over time, these percents will stack up and your competitors all playing on the
            public leaderboard will be none-the-wiser.
        </p>

        <p>
            One important technique I will mention here is to occasionally throw in historical versions of your bots
            to the simulated competitor bot pool.

            It will reduce your simulated win-rate, but reduces overfitting and creates more realistic competitors.

            This is similar to self-play that was used to create <a href="https://en.wikipedia.org/wiki/AlphaGo">AlphaGo</a>.
        </p>

        <p>
            A number of techniques like this are discussed in our strategy <a
                href="https://github.com/mattyhempstead/syncs-coup-bot"
            >write-up</a>. Ultimately, the key takeaway here
            should be that bot writing is equally a science as it is (software) engineering, and it should be treated as such.
        </p>

    </ProjectPage>
}
