const SectionHeading = ({children,className, ...props}) => {
  return (
    <h2 className={`mb-4 md:mb-8 uppercase font-[700] ${className}`} {...props}>
        {children}
    </h2>
  )
}

export default SectionHeading