import ButtonPrimary from "../controls/ButtonPrimary"
import SectionHeading from "../controls/SectionHeading"
import "../style.css"
const About = () => {
    return (
        <section className="about">
            <div className="about-inner side-space section-space">
                <SectionHeading className="text-center">about Turbokids!</SectionHeading>
                <p><strong>Welcome to TurboKids – The World’s First Avatar-Based Digital School!</strong></p>
                <p>TurboKids is the world’s first avatar-based digital school, designed especially for children from Kindergarten to Grade 5. Built on a next-generation gaming platform, it turns everyday learning into a fun and interactive experience. The school works seamlessly on any basic smartphone and can even be accessed without an internet connection, making it truly accessible to all.</p>
                <p>Our curriculum is expertly curated to bring together the best of global education, using interactive lessons, gamified activities, and rewards that keep kids engaged and excited. Children earn coins as they learn, which they can use in fun entertainment zones, making learning both enjoyable and rewarding.</p>
                <p>TurboKids allows each child to learn at their own pace, with personalized lesson plans and the flexibility to repeat classes whenever they need. It creates a supportive environment where kids can build strong foundations without pressure or limitations.</p>
                <p>At TurboKids, we believe that every child deserves high-quality education, no matter their location, background, or schedule. With just a tap, your child can step into a world of joyful learning that’s smart, accessible, and built for the future.</p>
            <ButtonPrimary isCenter/>
            </div>
        </section>
    )
}

export default About