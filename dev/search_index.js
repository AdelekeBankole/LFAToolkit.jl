var documenterSearchIndex = {"docs":
[{"location":"#LFAToolkit","page":"LFAToolkit","title":"LFAToolkit","text":"","category":"section"},{"location":"","page":"LFAToolkit","title":"LFAToolkit","text":"Local Fourier Analysis for arbitrary order finite element type operators","category":"page"},{"location":"","page":"LFAToolkit","title":"LFAToolkit","text":"Modules = [LFAToolkit]","category":"page"},{"location":"#LFAToolkit.Basis","page":"LFAToolkit","title":"LFAToolkit.Basis","text":"Finite element basis for function spaces and test spaces\n\n\n\n\n\n","category":"type"},{"location":"#LFAToolkit.Mesh","page":"LFAToolkit","title":"LFAToolkit.Mesh","text":"Rectangular mesh with independent scaling in each dimesion\n\n\n\n\n\n","category":"type"},{"location":"#LFAToolkit.Mesh1D","page":"LFAToolkit","title":"LFAToolkit.Mesh1D","text":"Mesh1D()\n\nmesh = Mesh1D(1.0);\n\nif (mesh.dx - 1.0) > 1e-15\n    println(\"Incorrect x scale\")\nend\n\n# output\n\n\n\n\n\n\n","category":"type"},{"location":"#LFAToolkit.Mesh2D","page":"LFAToolkit","title":"LFAToolkit.Mesh2D","text":"Mesh2D()\n\nmesh = Mesh2D(1.0, 0.5);\n\nif (mesh.dx - 1.0) > 1e-15\n    println(\"Incorrect x scale\")\nend\nif (mesh.dy - 0.5) > 1e-15\n    println(\"Incorrect y scale\")\nend\n\n# output\n\n\n\n\n\n\n","category":"type"},{"location":"#LFAToolkit.Mesh3D","page":"LFAToolkit","title":"LFAToolkit.Mesh3D","text":"Mesh2D()\n\nmesh = Mesh3D(1.0, 0.5, 0.25);\n\nif (mesh.dx - 1.0) > 1e-15\n    println(\"Incorrect x scale\")\nend\nif (mesh.dy - 0.5) > 1e-15\n    println(\"Incorrect y scale\")\nend\nif (mesh.dz - 0.25) > 1e-15\n    printlt(\"Incorrect z scale\")\nend\n\n# output\n\n\n\n\n\n\n","category":"type"},{"location":"#LFAToolkit.NonTensorBasis","page":"LFAToolkit","title":"LFAToolkit.NonTensorBasis","text":"Non-tensor basis\n\n\n\n\n\n","category":"type"},{"location":"#LFAToolkit.Operator","page":"LFAToolkit","title":"LFAToolkit.Operator","text":"Finite element operator comprising of a weak form and bases\n\n\n\n\n\n","category":"type"},{"location":"#LFAToolkit.OperatorField","page":"LFAToolkit","title":"LFAToolkit.OperatorField","text":"Finite Element operator input or output, with a basis and evaluation mode\n\n\n\n\n\n","category":"type"},{"location":"#LFAToolkit.TensorBasis","page":"LFAToolkit","title":"LFAToolkit.TensorBasis","text":"Tensor product basis\n\n\n\n\n\n","category":"type"},{"location":"#LFAToolkit.TensorH1LagrangeBasis-NTuple{4,Int64}","page":"LFAToolkit","title":"LFAToolkit.TensorH1LagrangeBasis","text":"TensorH1LagrangeBasis()\n\nTensor product basis on Gauss-Lobatto points with Gauss-Legendre quadrature\n\nbasis = TensorH1LagrangeBasis(4, 3, 2, 1);\n\n# verify\nif basis.p1d != 4\n    println(\"Incorrect P1d\");\nend\nif basis.q1d != 3\n    println(\"Incorrect Q1d\");\nend\nif basis.dimension != 2\n    println(\"Incorrect dimension\");\nend\nif basis.numbercomponents != 1\n    println(\"Incorrect number of components\");\nend\n\n# output\n\n\n\n\n\n\n","category":"method"},{"location":"#LFAToolkit.gaussquadrature-Tuple{Int64}","page":"LFAToolkit","title":"LFAToolkit.gaussquadrature","text":"gaussquadrature()\n\nConstruct a Gauss-Legendre quadrature\n\nquadraturepoints, quadratureweights = LFAToolkit.gaussquadrature(5);\n\n# verify\ntruepoints = [-sqrt(5 + 2*sqrt(10/7))/3, -sqrt(5 - 2*sqrt(10/7))/3, 0.0, sqrt(5 - 2*sqrt(10/7))/3, sqrt(5 + 2*sqrt(10/7))/3];\ntrueweights = [(322-13*sqrt(70))/900, (322+13*sqrt(70))/900, 128/225, (322+13*sqrt(70))/900, (322-13*sqrt(70))/900];\n\ndiff = truepoints - quadraturepoints;\nif abs(max(diff...)) > 1e-15\n    println(\"Incorrect quadrature points\");\nend\n\ndiff = trueweights - quadratureweights;\nif abs(abs(max(diff...))) > 1e-15\n    println(\"Incorrect quadrature weights\");\nend\n\n# output\n\n\n\n\n\n\n","category":"method"},{"location":"#LFAToolkit.getgradient-Tuple{LFAToolkit.NonTensorBasis}","page":"LFAToolkit","title":"LFAToolkit.getgradient","text":"getgradient()\n\nGet full gradient matrix for basis\n\nbasis = TensorH1LagrangeBasis(4, 3, 1, 1);\ngradient = LFAToolkit.getgradient(basis);\n\n# verify\nfor i in 1:3\n    sum = 0.0\n    for j = 1:4\n        sum += gradient[i, j];\n    end\n    if abs(sum) > 1e-15\n        println(\"Incorrect gradent matrix\")\n    end\nend\n\n# output\n\n\nbasis = TensorH1LagrangeBasis(4, 3, 2, 1);\ngradient = LFAToolkit.getgradient(basis);\n\n# verify\nfor d in 1:2, i in 1:3^2\n    sum = 0.0\n    for j = 1:4^2\n        sum += gradient[d, i, j];\n    end\n    if abs(sum) > 1e-15\n        println(\"Incorrect gradient matrix\")\n    end\nend\n\n# output\n\n\nbasis = TensorH1LagrangeBasis(4, 3, 3, 1);\ngradient = LFAToolkit.getgradient(basis);\n\n# verify\nfor d in 1:3, i in 1:3^3\n    sum = 0.0\n    for j = 1:4^3\n        sum += gradient[d, i, j];\n    end\n    if abs(sum) > 1e-14\n        println(\"Incorrect gradient matrix\")\n    end\nend\n\n# output\n\n\n\n\n\n\n","category":"method"},{"location":"#LFAToolkit.getinterpolation-Tuple{LFAToolkit.NonTensorBasis}","page":"LFAToolkit","title":"LFAToolkit.getinterpolation","text":"getinterpolation()\n\nGet full interpolation matrix for basis\n\nbasis = TensorH1LagrangeBasis(4, 3, 1, 1);\ninterpolation = LFAToolkit.getinterpolation(basis);\n\n# verify\nfor i in 1:3\n    sum = 0.0\n    for j = 1:4\n        sum += interpolation[i, j];\n    end\n    if abs(sum - 1.0) > 1e-15\n        println(\"Incorrect interpolation matrix\")\n    end\nend\n\n# output\n\n\nbasis = TensorH1LagrangeBasis(4, 3, 2, 1);\ninterpolation = LFAToolkit.getinterpolation(basis);\n\n# verify\nfor i in 1:3^2\n    sum = 0.0\n    for j = 1:4^2\n        sum += interpolation[i, j];\n    end\n    if abs(sum - 1.0) > 1e-15\n        println(\"Incorrect interpolation matrix\")\n    end\nend\n\n# output\n\n\nbasis = TensorH1LagrangeBasis(4, 3, 3, 1);\ninterpolation = LFAToolkit.getinterpolation(basis);\n\n# verify\nfor i in 1:3^3\n    sum = 0.0\n    for j = 1:4^3\n        sum += interpolation[i, j];\n    end\n    if abs(sum - 1.0) > 1e-15\n        println(\"Incorrect interpolation matrix\")\n    end\nend\n\n# output\n\n\n\n\n\n\n","category":"method"},{"location":"#LFAToolkit.getquadratureweights-Tuple{LFAToolkit.NonTensorBasis}","page":"LFAToolkit","title":"LFAToolkit.getquadratureweights","text":"getquadratureweights()\n\nGet full quadrature weights vector for basis\n\nbasis = TensorH1LagrangeBasis(4, 3, 1, 1);\nquadratureweights = LFAToolkit.getquadratureweights(basis);\n\n# verify\ntrueweights = [5/9, 8/9, 5/9];\n\ndiff = trueweights - quadratureweights;\nif abs(abs(max(diff...))) > 1e-15\n    println(\"Incorrect quadrature weights\");\nend\n\n# output\n\n\nbasis = TensorH1LagrangeBasis(4, 3, 2, 1);\nquadratureweights = LFAToolkit.getquadratureweights(basis);\n\n# verify\ntrueweights1d = [5/9, 8/9, 5/9];\ntrueweights = kron(trueweights1d, trueweights1d);\n\ndiff = trueweights - quadratureweights;\nif abs(abs(max(diff...))) > 1e-15\n    println(\"Incorrect quadrature weights\");\nend\n    \n# output\n\n\nbasis = TensorH1LagrangeBasis(4, 3, 3, 1);\nquadratureweights = LFAToolkit.getquadratureweights(basis);\n\n# verify\ntrueweights1d = [5/9, 8/9, 5/9];\ntrueweights = kron(trueweights1d, trueweights1d, trueweights1d);\n\ndiff = trueweights - quadratureweights;\nif abs(abs(max(diff...))) > 1e-15\n    println(\"Incorrect quadrature weights\");\nend\n    \n# output\n\n\n\n\n\n\n","category":"method"},{"location":"#LFAToolkit.getstencil-Tuple{Operator}","page":"LFAToolkit","title":"LFAToolkit.getstencil","text":"getstencil()\n\nCompute or retreive the stencil of operator for computing the symbol\n\n\n\n\n\n","category":"method"},{"location":"#LFAToolkit.lobattoquadrature-Tuple{Int64,Bool}","page":"LFAToolkit","title":"LFAToolkit.lobattoquadrature","text":"lobattoquadrature()\n\nConstruct a Gauss-Lobatto quadrature\n\nquadraturepoints = LFAToolkit.lobattoquadrature(5, false);\n\n# verify\ntruepoints = [-1.0, -sqrt(3/7), 0.0, sqrt(3/7), 1.0];\n\ndiff = truepoints - quadraturepoints;\nif abs(max(diff...)) > 1e-15\n    println(\"Incorrect quadrature points\");\nend\n\n# output\n\n\nquadraturepoints, quadratureweights = LFAToolkit.lobattoquadrature(5, true);\n\n# verify\ntruepoints = [-1.0, -sqrt(3/7), 0.0, sqrt(3/7), 1.0];\ntrueweights = [1/10, 49/90, 32/45, 49/90, 1/10];\n\ndiff = truepoints - quadraturepoints;\nif abs(max(diff...)) > 1e-15\n    println(\"Incorrect quadrature points\");\nend\n\ndiff = trueweights - quadratureweights;\nif abs(abs(max(diff...))) > 1e-15\n    println(\"Incorrect quadrature weights\");\nend\n\n# output\n\n\n\n\n\n\n","category":"method"}]
}
