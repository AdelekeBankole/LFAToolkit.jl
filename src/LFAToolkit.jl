# ---------------------------------------------------------------------------------------------------------------------
# Local Fourier Analysis Toolkit
# ---------------------------------------------------------------------------------------------------------------------

module LFAToolkit

# ---------------------------------------------------------------------------------------------------------------------
# User avaliable types and methods
# ---------------------------------------------------------------------------------------------------------------------

export EvaluationMode, FieldMode
export TensorH1LagrangeBasis
export OperatorField
export Operator, getstencil

# ---------------------------------------------------------------------------------------------------------------------
# Imports
# ---------------------------------------------------------------------------------------------------------------------

include("Enums.jl")
include("Basis.jl")
include("OperatorField.jl")
include("Operator.jl")

end # module

# ---------------------------------------------------------------------------------------------------------------------
