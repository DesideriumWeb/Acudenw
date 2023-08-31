/**
 * TutorialBasicCard component for tutorials.
 * Displays a title and a message.
 *
 * @param {string} title - The title of the content.
 * @param {string} message - The message of the content.
 * @returns {JSX.Element} The JSX element representing the JoyrideContent component.
 */
const TutorialBasicCard = ({ title, message }) => {
    return (
        <div className="w-full p-4 text-left">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-sm">{message}</p>
        </div>
    );
};

export default TutorialBasicCard;
