var documenterSearchIndex = {"docs":
[{"location":"references/#References","page":"References","title":"References","text":"","category":"section"},{"location":"references/","page":"References","title":"References","text":"A. Brandt. Multi-level adaptive solutions to boundary-value problems. Math. Comp., 31(138):33-390, 1977.","category":"page"},{"location":"public/mesh/#Mesh","page":"Mesh","title":"Mesh","text":"","category":"section"},{"location":"public/mesh/","page":"Mesh","title":"Mesh","text":"Mesh1D\nMesh2D\nMesh3D","category":"page"},{"location":"public/mesh/#LFAToolkit.Mesh1D","page":"Mesh","title":"LFAToolkit.Mesh1D","text":"Mesh1D(dx)\n\nOne dimensional regular background mesh\n\nArguments:\n\ndx: deformation in x dimension\n\nReturns:\n\nOne dimensional mesh object\n\nExample:\n\n# generate 1D mesh\nmesh = Mesh1D(1.0);\n\n# verify\nprintln(mesh)\n\n# output\n1d mesh:\n    dx: 1.0\n\n\n\n\n\n","category":"type"},{"location":"public/mesh/#LFAToolkit.Mesh2D","page":"Mesh","title":"LFAToolkit.Mesh2D","text":"Mesh2D(dx, dy)\n\nTwo dimensional regular background mesh\n\nArguments:\n\ndx: deformation in x dimension\ndy: deformation in y dimension\n\nReturns:\n\nTwo dimensional mesh object\n\nExample:\n\n# generate 2D mesh\nmesh = Mesh2D(1.0, 0.5);\n\n# verify\nprintln(mesh)\n\n# output\n2d mesh:\n    dx: 1.0\n    dy: 0.5\n\n\n\n\n\n","category":"type"},{"location":"public/mesh/#LFAToolkit.Mesh3D","page":"Mesh","title":"LFAToolkit.Mesh3D","text":"Mesh3D(dx, dy, dz)\n\nThree dimensional regular background mesh\n\nArguments:\n\ndx: deformation in x dimension\ndy: deformation in y dimension\ndz: deformation in z dimension\n\nReturns:\n\nThree dimensional mesh object\n\nExample:\n\n# generate 3D mesh\nmesh = Mesh3D(1.0, 0.5, 0.3);\n\n# verify\nprintln(mesh)\n\n# output\n3d mesh:\n    dx: 1.0\n    dy: 0.5\n    dz: 0.3\n\n\n\n\n\n","category":"type"},{"location":"private/pc_jacobi/#Preconditioner:-Jacobi","page":"Preconditioner: Jacobi","title":"Preconditioner: Jacobi","text":"","category":"section"},{"location":"private/pc_jacobi/","page":"Preconditioner: Jacobi","title":"Preconditioner: Jacobi","text":"LFAToolkit.getoperatordiagonalinverse","category":"page"},{"location":"private/pc_jacobi/#LFAToolkit.getoperatordiagonalinverse","page":"Preconditioner: Jacobi","title":"LFAToolkit.getoperatordiagonalinverse","text":"getoperatordiagonalinverse(preconditioner)\n\nCompute or retrieve the inverse of the symbol matrix diagonal for a Jacobi preconditioner\n\nReturns:\n\nSymbol matrix diagonal inverse for the operator\n\nExample:\n\n# setup\nmesh = Mesh1D(1.0);\nbasis = TensorH1LagrangeBasis(3, 4, 1);\n    \nfunction diffusionweakform(du::Array{Float64}, w::Array{Float64})\n    dv = du * w[1]\n    return [dv]\nend\n    \n# mass operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.gradient]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.gradient])];\ndiffusion = Operator(diffusionweakform, mesh, inputs, outputs);\n\n# preconditioner\njacobi = Jacobi(diffusion)\n\n# note: either syntax works\ndiagonalinverse = LFAToolkit.getoperatordiagonalinverse(jacobi);\ndiagonalinverse = jacobi.operatordiagonalinverse;\n\n# verify\n@assert diagonalinverse ≈ [6/7 0; 0 3/4]\n \n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/basis/#Basis","page":"Basis","title":"Basis","text":"","category":"section"},{"location":"private/basis/","page":"Basis","title":"Basis","text":"LFAToolkit.Basis\nLFAToolkit.gaussquadrature\nLFAToolkit.lobattoquadrature\nLFAToolkit.getnumbernodes\nLFAToolkit.getnodes\nLFAToolkit.getnumberquadraturepoints\nLFAToolkit.getquadraturepoints\nLFAToolkit.getquadratureweights\nLFAToolkit.getinterpolation\nLFAToolkit.getgradient\nLFAToolkit.getnumbermodes\nLFAToolkit.getmodemap\nLFAToolkit.getdiagonal","category":"page"},{"location":"private/basis/#LFAToolkit.Basis","page":"Basis","title":"LFAToolkit.Basis","text":"Finite element basis for function spaces and test spaces\n\n\n\n\n\n","category":"type"},{"location":"private/basis/#LFAToolkit.gaussquadrature","page":"Basis","title":"LFAToolkit.gaussquadrature","text":"gaussquadrature(q)\n\nConstruct a Gauss-Legendre quadrature\n\nArguments:\n\nq: number of Gauss-Legendre points\n\nReturns:\n\nGauss-Legendre quadrature points and weights\n\nExample:\n\n# generate Gauss-Legendre points and weights\nquadraturepoints, quadratureweights = LFAToolkit.gaussquadrature(5);\n\n# verify\ntruepoints = [\n    -√(5 + 2*√(10/7))/3,\n    -√(5 - 2*√(10/7))/3,\n    0.0,\n    √(5 - 2*√(10/7))/3,\n    √(5 + 2*√(10/7))/3\n];\n@assert truepoints ≈ quadraturepoints\n\ntrueweights = [\n    (322-13*√70)/900,\n    (322+13*√70)/900,\n    128/225,\n    (322+13*√70)/900,\n    (322-13*√70)/900\n];\n@assert trueweights ≈ quadratureweights\n\n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/basis/#LFAToolkit.lobattoquadrature","page":"Basis","title":"LFAToolkit.lobattoquadrature","text":"lobattoquadrature(q, weights)\n\nConstruct a Gauss-Lobatto quadrature\n\nArguments:\n\nq:       number of Gauss-Lobatto points\nweights: boolean flag indicating if quadrature weights are desired\n\nReturns:\n\nGauss-Lobatto quadrature points or points and weights\n\nExample:\n\n# generate Gauss-Lobatto points\nquadraturepoints = LFAToolkit.lobattoquadrature(5, false);\n\n# verify\ntruepoints = [-1.0, -√(3/7), 0.0, √(3/7), 1.0];\n@assert truepoints ≈ quadraturepoints\n\n# generate Gauss-Lobatto points and weights\nquadraturepoints, quadratureweights = LFAToolkit.lobattoquadrature(5, true);\n\n# verify\ntrueweights = [1/10, 49/90, 32/45, 49/90, 1/10];\n@assert trueweights ≈ quadratureweights\n\n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/basis/#LFAToolkit.getnumbernodes","page":"Basis","title":"LFAToolkit.getnumbernodes","text":"getnumbernodes(basis)\n\nGet the number of nodes for the basis\n\nArguments:\n\nbasis: basis to compute number of nodes\n\nReturns:\n\nInteger number of basis nodes\n\nExample:\n\n# get number of nodes for basis\nbasis = TensorH1LagrangeBasis(4, 3, 2);\n\n# note: either syntax works\nnumbernodes = LFAToolkit.getnumbernodes(basis);\nnumbernodes = basis.numbernodes;\n\n# verify\n@assert numbernodes == 4^2\n\n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/basis/#LFAToolkit.getnodes","page":"Basis","title":"LFAToolkit.getnodes","text":"getnodes(basis)\n\nGet nodes for basis\n\nReturns:\n\nBasis nodes array\n\nArguments:\n\nbasis: basis to compute nodes\n\nExample:\n\n# test for all supported dimensions\nfor dimension in 1:3\n    # get basis quadrature weights\n    basis = TensorH1LagrangeBasis(4, 3, dimension);\n\n    # note: either syntax works\n    nodes = LFAToolkit.getnodes(basis);\n    nodes = basis.nodes;\n\n    # verify\n    truenodes1d = [-1, -√(1/5), √(1/5), 1];\n    truenodes = [];\n    if dimension == 1\n        truenodes = truenodes1d;\n    elseif dimension == 2\n        truenodes =\n            transpose(hcat([[[x, y] for x in truenodes1d, y in truenodes1d]...]...));\n    elseif dimension == 3\n        truenodes = transpose(hcat([[\n            [x, y, z] for x in truenodes1d, y in truenodes1d, z in truenodes1d\n        ]...]...));\n    end\n\n    @assert truenodes ≈ nodes\nend\n    \n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/basis/#LFAToolkit.getnumberquadraturepoints","page":"Basis","title":"LFAToolkit.getnumberquadraturepoints","text":"getnumberquadraturepoints(basis)\n\nGet the number of quadrature points for the basis\n\nArguments:\n\nbasis: basis to compute number of quadrature points\n\nReturns:\n\nInteger number of basis quadrature points\n\nExample:\n\n# get number of quadrature points for basis\nbasis = TensorH1LagrangeBasis(4, 3, 2);\n\n# note: either syntax works\nnumberquadraturepoints = LFAToolkit.getnumberquadraturepoints(basis);\nnumberquadraturepoints = basis.numberquadraturepoints;\n    \n# verify\n@assert numberquadraturepoints == 3^2\n    \n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/basis/#LFAToolkit.getquadraturepoints","page":"Basis","title":"LFAToolkit.getquadraturepoints","text":"getquadraturepoints(basis)\n\nGet quadrature points for basis\n\nReturns:\n\nBasis quadrature points array\n\nArguments:\n\nbasis: basis to compute quadrature points\n\nExample:\n\n# test for all supported dimensions\nfor dimension in 1:3\n    # get basis quadrature weights\n    basis = TensorH1LagrangeBasis(4, 3, dimension);\n\n    # note: either syntax works\n    quadraturepoints = LFAToolkit.getquadraturepoints(basis);\n    quadraturepoints = basis.quadraturepoints;\n\n    # verify\n    truequadraturepoints1d = [-√(3/5), 0, √(3/5)];\n    truequadraturepoints = [];\n    if dimension == 1\n        truequadraturepoints = truequadraturepoints1d;\n    elseif dimension == 2\n        truequadraturepoints = transpose(hcat([[\n            [x, y] for x in truequadraturepoints1d, y in truequadraturepoints1d\n        ]...]...));\n    elseif dimension == 3\n        truequadraturepoints = transpose(hcat([[\n            [x, y, z]\n            for\n            x in truequadraturepoints1d,\n            y in truequadraturepoints1d, z in truequadraturepoints1d\n        ]...]...));\n    end\n\n    @assert truequadraturepoints ≈ quadraturepoints\nend\n    \n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/basis/#LFAToolkit.getquadratureweights","page":"Basis","title":"LFAToolkit.getquadratureweights","text":"getquadratureweights(basis)\n\nGet full quadrature weights vector for basis\n\nReturns:\n\nBasis quadrature weights vector\n\nArguments:\n\nbasis: basis to compute quadrature weights\n\nExample:\n\n# test for all supported dimensions\nfor dimension in 1:3\n    # get basis quadrature weights\n    basis = TensorH1LagrangeBasis(4, 3, dimension);\n\n    # note: either syntax works\n    quadratureweights = LFAToolkit.getquadratureweights(basis);\n    quadratureweights = basis.quadratureweights;\n\n    # verify\n    trueweights1d = [5/9, 8/9, 5/9];\n    trueweights = [];\n    if dimension == 1\n        trueweights = trueweights1d;\n    elseif dimension == 2\n        trueweights = kron(trueweights1d, trueweights1d);\n    elseif dimension == 3\n        trueweights = kron(trueweights1d, trueweights1d, trueweights1d);\n    end\n\n    @assert trueweights ≈ quadratureweights\nend\n    \n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/basis/#LFAToolkit.getinterpolation","page":"Basis","title":"LFAToolkit.getinterpolation","text":"getinterpolation(basis)\n\nGet full interpolation matrix for basis\n\nArguments:\n\nbasis: basis to compute interpolation matrix\n\nReturns:\n\nBasis interpolation matrix\n\nExample:\n\n# test for all supported dimensions\nfor dimension in 1:3\n    # get basis interpolation matrix\n    basis = TensorH1LagrangeBasis(4, 3, dimension);\n\n    # note: either syntax works\n    interpolation = LFAToolkit.getinterpolation(basis);\n    interpolation = basis.interpolation;\n\n    # verify\n    for i in 1:3^dimension\n        total = sum(interpolation[i, :]);\n        @assert total ≈ 1.0\n    end\nend\n\n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/basis/#LFAToolkit.getgradient","page":"Basis","title":"LFAToolkit.getgradient","text":"getgradient(basis)\n\nGet full gradient matrix for basis\n\nArguments:\n\nbasis: basis to compute gradient matrix\n\nReturns:\n\nBasis gradient matrix\n\nExample:\n\n# test for all supported dimensions\nfor dimension in 1:3\n    # get basis gradient matrix\n    basis = TensorH1LagrangeBasis(4, 3, dimension);\n\n    # note: either syntax works\n    gradient = LFAToolkit.getgradient(basis);\n    gradient = basis.gradient;\n\n    # verify\n    for i in 1:dimension*3^dimension\n        total = sum(gradient[i, :]);\n        @assert abs(total) < 1e-14\n    end\nend\n\n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/basis/#LFAToolkit.getnumbermodes","page":"Basis","title":"LFAToolkit.getnumbermodes","text":"getnumbermodes(basis)\n\nGet number of modes for basis\n\nArguments:\n\nbasis: basis to compute number of modes\n\nReturns:\n\nNumber of modes for basis\n\nExample:\n\n# test for all supported dimensions\nfor dimension in 1:3\n    # get number of basis modes\n    basis = TensorH1LagrangeBasis(4, 3, dimension);\n\n    # note: either syntax works\n    numbermodes = LFAToolkit.getnumbermodes(basis);\n    numbermodes = basis.numbermodes;\n\n    # verify\n    @assert numbermodes == 3^dimension\nend\n\n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/basis/#LFAToolkit.getmodemap","page":"Basis","title":"LFAToolkit.getmodemap","text":"getmodemap(basis)\n\nGet mode mapping vector for basis\n\nArguments:\n\nbasis: basis to compute mode map vector\n\nReturns:\n\nBasis mode map vector\n\nExample:\n\n# test for all supported dimensions\nfor dimension in 1:3\n    # get mode map vector\n    basis = TensorH1LagrangeBasis(4, 3, dimension);\n\n    # note: either syntax works\n    modemap = LFAToolkit.getmodemap(basis);\n    modemap = basis.modemap;\n\n    # verify\n    truemodemap1d = [1, 2, 3, 1];\n    truemodemap = [];\n    if dimension == 1\n        truemodemap = truemodemap1d;\n    elseif dimension == 2\n        truemodemap = [[\n            i + (j - 1)*3 for i in truemodemap1d, j in truemodemap1d\n        ]...];\n    elseif dimension == 3\n        truemodemap = [[\n            i +\n            (j - 1)*3 +\n            (k - 1)*3^2\n            for i in truemodemap1d, j in truemodemap1d, k in truemodemap1d\n        ]...];\n    end\n\n    @assert truemodemap == modemap\nend\n\n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/basis/#LFAToolkit.getdiagonal","page":"Basis","title":"LFAToolkit.getdiagonal","text":"getdiagonal(operator)\n\nCompute or retrieve the symbol matrix diagonal for an operator\n\nReturns:\n\nSymbol matrix diagonal for the operator\n\nExample:\n\n# setup\nmesh = Mesh1D(1.0);\nbasis = TensorH1LagrangeBasis(3, 4, 1);\n    \nfunction diffusionweakform(du::Array{Float64}, w::Array{Float64})\n    dv = du * w[1]\n    return [dv]\nend\n    \n# mass operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.gradient]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.gradient])];\ndiffusion = Operator(diffusionweakform, mesh, inputs, outputs);\n\n# note: either syntax works\ndiagonal = LFAToolkit.getdiagonal(diffusion);\ndiagonal = diffusion.diagonal;\n\n# verify\n@assert diagonal ≈ [7/6 0; 0 4/3]\n \n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/#Private-API","page":"Overview","title":"Private API","text":"","category":"section"},{"location":"private/","page":"Overview","title":"Overview","text":"This section documents the private API of the LFAToolkit.","category":"page"},{"location":"private/#Contents","page":"Overview","title":"Contents","text":"","category":"section"},{"location":"private/","page":"Overview","title":"Overview","text":"Pages = [\n    \"private/mesh.md\",\n    \"private/basis.md\",\n    \"private/operator.md\",\n    \"private/pc_jacobi.md\",\n]","category":"page"},{"location":"public/pc_jacobi/#Preconditioner:-Jacobi","page":"Preconditioner: Jacobi","title":"Preconditioner: Jacobi","text":"","category":"section"},{"location":"public/pc_jacobi/","page":"Preconditioner: Jacobi","title":"Preconditioner: Jacobi","text":"Jacobi\ncomputesymbols(::Jacobi, ::Number, ::Array)","category":"page"},{"location":"public/pc_jacobi/#LFAToolkit.Jacobi","page":"Preconditioner: Jacobi","title":"LFAToolkit.Jacobi","text":"Jacobi(operator)\n\nJacobi diagonal preconditioner for finite element operators\n\nArguments:\n\noperator: finite element operator to precondition\n\nReturns:\n\nJacobi preconditioner object\n\nExample:\n\n# setup\nmesh = Mesh2D(1.0, 1.0);\nbasis = TensorH1LagrangeBasis(4, 4, 2);\n    \nfunction massweakform(u::Array{Float64}, w::Array{Float64})\n    v = u * w[1]\n    return [v]\nend\n    \n# mass operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.interpolation]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.interpolation])];\nmass = Operator(massweakform, mesh, inputs, outputs);\n\n# preconditioner\njacobi = Jacobi(mass);\n\n# verify\nprintln(jacobi)\nprintln(jacobi.operator)\n\n# output\njacobi preconditioner\nfinite element operator:\n2d mesh:\n    dx: 1.0\n    dy: 1.0\n\n2 inputs:\noperator field:\ntensor product basis:\n    numbernodes1d: 4\n    numberquadraturepoints1d: 4\n    dimension: 2\n  evaluation mode:\n    interpolation\noperator field:\ntensor product basis:\n    numbernodes1d: 4\n    numberquadraturepoints1d: 4\n    dimension: 2\n  evaluation mode:\n    quadratureweights\n\n1 output:\noperator field:\ntensor product basis:\n    numbernodes1d: 4\n    numberquadraturepoints1d: 4\n    dimension: 2\n  evaluation mode:\n    interpolation\n\n\n\n\n\n","category":"type"},{"location":"public/pc_jacobi/#LFAToolkit.computesymbols-Tuple{Jacobi,Number,Array}","page":"Preconditioner: Jacobi","title":"LFAToolkit.computesymbols","text":"computesymbols(preconditioner, ω, θ_x, ...)\n\nCompute or retrieve the symbol matrix for a Jacobi preconditioned operator\n\nArguments:\n\npreconditioner: Jacobi preconditioner to compute symbol matrix for\nω:              Smoothing weighting factor\nθ_x:            Fourier mode frequency in x direction\nθ_y:            Fourier mode frequency in y direction (2D and 3D)\nθ_z:            Fourier mode frequency in z direction (3D)\n\nReturns:\n\nSymbol matrix for the Jacobi preconditioned operator\n\n1D Example:\n\n# setup\nmesh = Mesh1D(1.0);\nbasis = TensorH1LagrangeBasis(3, 4, 1);\n    \nfunction diffusionweakform(du::Array{Float64}, w::Array{Float64})\n    dv = du * w[1]\n    return [dv]\nend\n    \n# mass operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.gradient]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.gradient])];\ndiffusion = Operator(diffusionweakform, mesh, inputs, outputs);\n\n# preconditioner\njacobi = Jacobi(diffusion);\n\n# compute symbols\nA = computesymbols(jacobi, 1.0, π);\n\n# verify\nusing LinearAlgebra;\neigenvalues = eigvals(A);\n@assert real(eigenvalues) ≈ [0; 1/7]\n \n# output\n\n\n2D Example:\n\n# setup\nmesh = Mesh2D(1.0, 1.0);\nbasis = TensorH1LagrangeBasis(3, 4, 2);\n    \nfunction diffusionweakform(du::Array{Float64}, w::Array{Float64})\n    dv = du * w[1]\n    return [dv]\nend\n    \n# mass operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.gradient]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.gradient])];\ndiffusion = Operator(diffusionweakform, mesh, inputs, outputs);\n\n# preconditioner\njacobi = Jacobi(diffusion)\n\n# compute symbols\nA = computesymbols(jacobi, 1.0, π, π);\n\n# verify\nusing LinearAlgebra;\neigenvalues = eigvals(A);\n@assert real(eigenvalues) ≈ [-1/4; -1/14; 0; 1/7]\n \n# output\n\n\n\n\n\n\n","category":"method"},{"location":"private/operator/#Operator","page":"Operator","title":"Operator","text":"","category":"section"},{"location":"private/operator/","page":"Operator","title":"Operator","text":"LFAToolkit.getelementmatrix\nLFAToolkit.getrowmodemap\nLFAToolkit.getcolumnmodemap\nLFAToolkit.getnodecoordinatedifferences","category":"page"},{"location":"private/operator/#LFAToolkit.getelementmatrix","page":"Operator","title":"LFAToolkit.getelementmatrix","text":"getelementmatrix(operator)\n\nCompute or retrieve the element matrix of operator for computing the symbol\n\nArguments:\n\noperator: operator to compute element element matrix\n\nReturns:\n\nAssembled element matrix\n\nMass matrix example:\n\n# setup\nmesh = Mesh2D(1.0, 1.0);\nbasis = TensorH1LagrangeBasis(4, 4, 2);\n    \nfunction massweakform(u::Array{Float64}, w::Array{Float64})\n    v = u * w[1]\n    return [v]\nend\n    \n# mass operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.interpolation]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.interpolation])];\nmass = Operator(massweakform, mesh, inputs, outputs);\n    \n# element matrix computation\n# note: either syntax works\nelementmatrix = LFAToolkit.getelementmatrix(mass);\nelementmatrix = mass.elementmatrix;\n\n# verify\nu = ones(4*4);\nv = elementmatrix * u;\n    \ntotal = sum(v);\n@assert total ≈ 1.0\n    \n# output\n\n\nDiffusion matrix example:\n\n# setup\nmesh = Mesh2D(1.0, 1.0);\nbasis = TensorH1LagrangeBasis(4, 4, 2);\n    \nfunction diffusionweakform(du::Array{Float64}, w::Array{Float64})\n    dv = du * w[1]\n    return [dv]\nend\n    \n# diffusion operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.gradient]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.gradient])];\ndiffusion = Operator(diffusionweakform, mesh, inputs, outputs);\n    \n# element matrix computation\n# note: either syntax works\nelementmatrix = LFAToolkit.getelementmatrix(diffusion);\nelementmatrix = diffusion.elementmatrix;\n    \n# verify\nu = ones(4*4);\nv = elementmatrix * u;\n    \ntotal = sum(v);\n@assert abs(total) < 1e-14\n    \n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/operator/#LFAToolkit.getrowmodemap","page":"Operator","title":"LFAToolkit.getrowmodemap","text":"getrowmodemap(operator)\n\nCompute or retrieve the matrix mapping the rows of the element matrix to the symbol matrix\n\nReturns:\n\nMatrix mapping rows of element matrix to symbol matrix\n\nExample:\n\n# setup\nmesh = Mesh1D(1.0);\nbasis = TensorH1LagrangeBasis(4, 4, 1);\n    \nfunction massweakform(u::Array{Float64}, w::Array{Float64})\n    v = u * w[1]\n    return [v]\nend\n    \n# mass operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.interpolation]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.interpolation])];\nmass = Operator(massweakform, mesh, inputs, outputs);\n\n# note: either syntax works\nmodemap = LFAToolkit.getrowmodemap(mass);\nmodemap = mass.rowmodemap;\n\n# verify\n@assert modemap ≈ [1 0 0 1; 0 1 0 0; 0 0 1 0]\n    \n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/operator/#LFAToolkit.getcolumnmodemap","page":"Operator","title":"LFAToolkit.getcolumnmodemap","text":"getcolumnmodemap(operator)\n\nCompute or retrieve the matrix mapping the columns of the element matrix to the symbol matrix\n\nReturns:\n\nMatrix mapping columns of element matrix to symbol matrix\n\nExample:\n\n# setup\nmesh = Mesh1D(1.0);\nbasis = TensorH1LagrangeBasis(4, 4, 1);\n    \nfunction massweakform(u::Array{Float64}, w::Array{Float64})\n    v = u * w[1]\n    return [v]\nend\n    \n# mass operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.interpolation]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.interpolation])];\nmass = Operator(massweakform, mesh, inputs, outputs);\n\n# note: either syntax works\nmodemap = LFAToolkit.getcolumnmodemap(mass);\nmodemap = mass.columnmodemap;\n\n# verify\n@assert modemap ≈ [1 0 0; 0 1 0; 0 0 1; 1 0 0]\n    \n# output\n\n\n\n\n\n\n","category":"function"},{"location":"private/operator/#LFAToolkit.getnodecoordinatedifferences","page":"Operator","title":"LFAToolkit.getnodecoordinatedifferences","text":"getnodecoordinatedifferences(operator)\n\nCompute or retrieve the array of differences in coordinates between nodes\n\nReturns:\n\nArray of differences in coordinates between nodes\n\nExample:\n\n# setup\nmesh = Mesh1D(1.0);\nbasis = TensorH1LagrangeBasis(4, 4, 1);\n    \nfunction massweakform(u::Array{Float64}, w::Array{Float64})\n    v = u * w[1]\n    return [v]\nend\n    \n# mass operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.interpolation]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.interpolation])];\nmass = Operator(massweakform, mesh, inputs, outputs);\n\n# note: either syntax works\nnodedifferences = LFAToolkit.getnodecoordinatedifferences(mass);\nnodedifferences = mass.nodecoordinatedifferences;\n\n# verify\ntruenodes = LFAToolkit.lobattoquadrature(4, false);\ntruenodedifferences = [\n    (truenodes[j] - truenodes[i])/2.0 for i in 1:4, j in 1:4\n];\n@assert nodedifferences ≈ truenodedifferences\n \n# output\n\n\n\n\n\n\n","category":"function"},{"location":"public/basis/#Basis","page":"Basis","title":"Basis","text":"","category":"section"},{"location":"public/basis/","page":"Basis","title":"Basis","text":"TensorBasis\nNonTensorBasis\nTensorH1LagrangeBasis","category":"page"},{"location":"public/basis/#LFAToolkit.TensorBasis","page":"Basis","title":"LFAToolkit.TensorBasis","text":"TensorBasis(\n    numbernodes1d,\n    numberquadraturepoints1d,\n    dimension,\n    nodes1d,\n    quadraturepoints1d,\n    quadratureweights1d,\n    interpolation1d,\n    gradient1d\n)\n\nTensor product basis\n\nArguments:\n\nnumbernodes1d:            number of nodes in 1 dimension\nnumberquadraturepoints1d: number of quadrature points in 1 dimension\ndimension:                dimension of the basis\nnodes1d:                  coordinates of the nodes in 1 dimension\nquadraturepoints1d:       coordinates of the quadrature points in 1 dimension\nquadratureweights1d:      quadrature weights in 1 dimension\ninterpolation1d:          interpolation matrix from nodes to quadrature points in 1 dimension\ngradient1d:               gradient matrix from nodes to quadrature points in 1 dimension\n\nReturns:\n\nTensor product basis object\n\n\n\n\n\n","category":"type"},{"location":"public/basis/#LFAToolkit.NonTensorBasis","page":"Basis","title":"LFAToolkit.NonTensorBasis","text":"NonTensorBasis(\n    numbernodes,\n    numberquadraturepoints,\n    dimension,\n    nodes,\n    quadraturepoints,\n    quadratureweights,\n    interpolation,\n    gradient\n)\n\nNon-tensor basis\n\nArguments:\n\nnumbernodes:            number of nodes \nnumberquadraturepoints: number of quadrature points\ndimension:              dimension of the basis\nnodes:                  coordinates of the nodes\nquadraturepoints:       coordinates of the quadrature points\nquadratureweights:      quadrature weights\ninterpolation:          interpolation matrix from nodes to quadrature points\ngradient:               gradient matrix from nodes to quadrature points\n\nReturns:\n\nNon-tensor product basis object\n\n\n\n\n\n","category":"type"},{"location":"public/basis/#LFAToolkit.TensorH1LagrangeBasis","page":"Basis","title":"LFAToolkit.TensorH1LagrangeBasis","text":"TensorH1LagrangeBasis(\n    numbernodes,\n    numberquadraturepoints1d,\n    dimension\n)\n\nTensor product basis on Gauss-Lobatto points with Gauss-Legendre quadrature\n\nArguments:\n\nnumbernodes1d:            number of Gauss-Lobatto nodes\nnumberquadraturepoints1d: number of Gauss-Legendre quadrature points\ndimension:                dimension of basis\n\nReturns:\n\nH1 Lagrange tensor product basis object\n\nExample:\n\n# generate H1 Lagrange tensor product basis\nbasis = TensorH1LagrangeBasis(4, 3, 2);\n\n# verify\nprintln(basis)\n\n# output\ntensor product basis:\n    numbernodes1d: 4\n    numberquadraturepoints1d: 3\n    dimension: 2\n\n\n\n\n\n","category":"function"},{"location":"public/operatorfield/#Operator-Field","page":"Operator Field","title":"Operator Field","text":"","category":"section"},{"location":"public/operatorfield/","page":"Operator Field","title":"Operator Field","text":"OperatorField","category":"page"},{"location":"public/operatorfield/#LFAToolkit.OperatorField","page":"Operator Field","title":"LFAToolkit.OperatorField","text":"OperatorField(\n    basis,\n    evaluationmodes\n)\n\nFinite Element operator input or output, with a basis and evaluation mode\n\nArguments:\n\nbasis:           finite element basis for the field\nevaluationmodes: array of basis evaluation modes,                    note that quadrature weights must be listed in a separate operator field\n\nReturns:\n\nFinite element operator field object\n\nExample:\n\n# basis\nbasis = TensorH1LagrangeBasis(4, 3, 2);\n\n# quadrature weights field\nweightsfield = OperatorField(basis, [EvaluationMode.quadratureweights]);\n\n# verify\nprintln(weightsfield)\n\n# input or output field\ninputfield = OperatorField(basis, [\n    EvaluationMode.interpolation,\n    EvaluationMode.gradient,\n]);\n\n# verify\nprintln(inputfield)\n\n# output\noperator field:\ntensor product basis:\n    numbernodes1d: 4\n    numberquadraturepoints1d: 3\n    dimension: 2\n  evaluation mode:\n    quadratureweights\noperator field:\ntensor product basis:\n    numbernodes1d: 4\n    numberquadraturepoints1d: 3\n    dimension: 2\n  evaluation modes:\n    interpolation\n    gradient\n\n\n\n\n\n","category":"type"},{"location":"public/operator/#Operator","page":"Operator","title":"Operator","text":"","category":"section"},{"location":"public/operator/","page":"Operator","title":"Operator","text":"Operator\ncomputesymbols(::Operator, ::Array)","category":"page"},{"location":"public/operator/#LFAToolkit.Operator","page":"Operator","title":"LFAToolkit.Operator","text":"Operator(\n    weakform,\n    mesh,\n    inputs,\n    outputs\n)\n\nFinite element operator comprising of a weak form and bases\n\nArguments:\n\nweakform: user provided function that represents weak form at quadrature points\nmesh:     mesh object with deformation in each dimension\ninputs:   array of operator input fields\noutputs:  array of operator output fields\n\nReturns:\n\nFinite element operator object\n\nExample:\n\n# setup\nmesh = Mesh2D(1.0, 1.0);\nbasis = TensorH1LagrangeBasis(4, 4, 2);\n    \nfunction massweakform(u::Array{Float64}, w::Array{Float64})\n    v = u * w[1]\n    return [v]\nend\n    \n# mass operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.interpolation]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.interpolation])];\nmass = Operator(massweakform, mesh, inputs, outputs);\n\n# verify\nprintln(mass)\n\n# output\nfinite element operator:\n2d mesh:\n    dx: 1.0\n    dy: 1.0\n\n2 inputs:\noperator field:\ntensor product basis:\n    numbernodes1d: 4\n    numberquadraturepoints1d: 4\n    dimension: 2\n  evaluation mode:\n    interpolation\noperator field:\ntensor product basis:\n    numbernodes1d: 4\n    numberquadraturepoints1d: 4\n    dimension: 2\n  evaluation mode:\n    quadratureweights\n\n1 output:\noperator field:\ntensor product basis:\n    numbernodes1d: 4\n    numberquadraturepoints1d: 4\n    dimension: 2\n  evaluation mode:\n    interpolation\n\n\n\n\n\n","category":"type"},{"location":"public/operator/#LFAToolkit.computesymbols-Tuple{Operator,Array}","page":"Operator","title":"LFAToolkit.computesymbols","text":"computesymbols(operator, θ_x, ...)\n\nCompute the symbol matrix for an operator\n\nArguments:\n\noperator: Finite element operator to compute symbol matrix for\nθ_x:      Fourier mode frequency in x direction\nθ_y:      Fourier mode frequency in y direction (2D and 3D)\nθ_z:      Fourier mode frequency in z direction (3D)\n\nReturns:\n\nSymbol matrix for the operator\n\n1D Example:\n\n# setup\nmesh = Mesh1D(1.0);\nbasis = TensorH1LagrangeBasis(3, 4, 1);\n    \nfunction diffusionweakform(du::Array{Float64}, w::Array{Float64})\n    dv = du * w[1]\n    return [dv]\nend\n    \n# mass operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.gradient]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.gradient])];\ndiffusion = Operator(diffusionweakform, mesh, inputs, outputs);\n\n# compute symbols\nA = computesymbols(diffusion, π);\n\n# verify\nusing LinearAlgebra;\neigenvalues = eigvals(A);\n@assert eigenvalues ≈ [1; 4/3]\n \n# output\n\n\n2D Example:\n\n# setup\nmesh = Mesh2D(1.0, 1.0);\nbasis = TensorH1LagrangeBasis(3, 4, 2);\n    \nfunction diffusionweakform(du::Array{Float64}, w::Array{Float64})\n    dv = du * w[1]\n    return [dv]\nend\n    \n# mass operator\ninputs = [\n    OperatorField(basis, [EvaluationMode.gradient]),\n    OperatorField(basis, [EvaluationMode.quadratureweights]),\n];\noutputs = [OperatorField(basis, [EvaluationMode.gradient])];\ndiffusion = Operator(diffusionweakform, mesh, inputs, outputs);\n\n# compute symbols\nA = computesymbols(diffusion, π, π);\n\n# verify\nusing LinearAlgebra;\neigenvalues = eigvals(A);\n@assert eigenvalues ≈ [1/3; 4/9; 16/30; 64/90]\n \n# output\n\n\n\n\n\n\n","category":"method"},{"location":"public/evaluationmode/#Basis-Evaluation-Mode","page":"Basis Evaluation Mode","title":"Basis Evaluation Mode","text":"","category":"section"},{"location":"public/evaluationmode/","page":"Basis Evaluation Mode","title":"Basis Evaluation Mode","text":"EvaluationMode.EvalMode","category":"page"},{"location":"public/evaluationmode/#LFAToolkit.EvaluationMode.EvalMode","page":"Basis Evaluation Mode","title":"LFAToolkit.EvaluationMode.EvalMode","text":"Basis evaluation mode for operator inputs and outputs\n\nModes:\n\ninterpolation:     values interpolated to quadrature points\ngradient:          derivatives evaluated at quadrature points\nquadratureweights: quadrature weights\n\nExample:\n\nEvaluationMode.EvalMode\n\n# output\nEnum LFAToolkit.EvaluationMode.EvalMode:\ninterpolation = 0\ngradient = 1\nquadratureweights = 2\n\n\n\n\n\n","category":"type"},{"location":"public/#Public-API","page":"Overview","title":"Public API","text":"","category":"section"},{"location":"public/","page":"Overview","title":"Overview","text":"This section documents the public API of the LFAToolkit.","category":"page"},{"location":"public/#Contents","page":"Overview","title":"Contents","text":"","category":"section"},{"location":"public/","page":"Overview","title":"Overview","text":"Pages = [\n    \"public/mesh.md\",\n    \"public/basis.md\",\n    \"public/evaluationmode.md\",\n    \"public/operatorfield.md\",\n    \"public/operator.md\",\n    \"public/pc_jacobi.md\",\n]","category":"page"},{"location":"background/#Mathematical-Background","page":"Mathematical Background","title":"Mathematical Background","text":"","category":"section"},{"location":"background/","page":"Mathematical Background","title":"Mathematical Background","text":"Local Fourier Analysis was first used by Brandt to analyze the convergence of multi-level adaptive techniques, but the technique has been adapted for multi-level and multi-grid techniques more broadly.","category":"page"},{"location":"background/","page":"Mathematical Background","title":"Mathematical Background","text":"By way of example, we will explore Local Fourier Analysis with the diffusion operator.","category":"page"},{"location":"background/","page":"Mathematical Background","title":"Mathematical Background","text":"Consider the PDE","category":"page"},{"location":"background/","page":"Mathematical Background","title":"Mathematical Background","text":"- nabla^2 u = f","category":"page"},{"location":"background/","page":"Mathematical Background","title":"Mathematical Background","text":"with corresponding weak form","category":"page"},{"location":"background/","page":"Mathematical Background","title":"Mathematical Background","text":"int_Omega nabla u cdot nabla v - int_partial Omega nabla u v = int_Omega f v forall v in V","category":"page"},{"location":"background/","page":"Mathematical Background","title":"Mathematical Background","text":"for some suitable V subseteq H_0^1 left( Omega right).","category":"page"},{"location":"background/","page":"Mathematical Background","title":"Mathematical Background","text":"In Local Fourier Analysis, we focus on single elements or macro-element patches, neglecting the boundary conditions by assuming the boundary is distant from the local element under consideration.","category":"page"},{"location":"background/","page":"Mathematical Background","title":"Mathematical Background","text":"a left( u v right) = int_Omega nabla u cdot nabla v","category":"page"},{"location":"background/","page":"Mathematical Background","title":"Mathematical Background","text":"In the specific case of a one dimensional mesh with cubic Lagrage basis on the Gauss-Lobatto points, the assembled stiffness matrix is given by INSERT STIFFNESS MATRIX HERE","category":"page"},{"location":"#LFAToolkit","page":"Introduction","title":"LFAToolkit","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Local Fourier Analysis for arbitrary order finite element type operators","category":"page"},{"location":"#Introduction","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Local Fourier Analysis is a tool commonly used in the analysis of multigrid and multilevel algorthms for solving partial differential equations via finite element or finite difference methods. This analysis can be used to predict convergance rates and optimize parameters in multilevel methods and preconditioners.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"This package provides a toolkit for analyzing the performance of preconditioners for arbitrary, user provided weak forms of partial differential equations.","category":"page"},{"location":"#Contents","page":"Introduction","title":"Contents","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Pages = [\n    \"background.md\",\n    \"public.md\",\n    \"private.md\",\n    \"references.md\"\n]\nDepth = 1","category":"page"},{"location":"private/mesh/#Mesh","page":"Mesh","title":"Mesh","text":"","category":"section"},{"location":"private/mesh/","page":"Mesh","title":"Mesh","text":"LFAToolkit.Mesh","category":"page"},{"location":"private/mesh/#LFAToolkit.Mesh","page":"Mesh","title":"LFAToolkit.Mesh","text":"Rectangular mesh with independent scaling in each dimesion\n\n\n\n\n\n","category":"type"}]
}
